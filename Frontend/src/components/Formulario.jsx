import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import './styles/Formulario.css';


export const Formulario = () => {
    const [tareas, setTareas] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [tareaSeleccionada, setTareaSeleccionada] = useState(null);
    const [tareaEditada, setTareaEditada] = useState({
        nombre: '',
        descripcion: '',
        fechaInicio: '',
        fechaFinal: '',
        persona: ''
    });
    const [tareaAgregada, setTareaAgregada] = useState({
        nombre: '',
        descripcion: '',
        fechaInicio: '',
        fechaFinal: '',
        persona: '',
        estado: ''
    });

    useEffect(() => {
        cargarTareas();
    }, [tareaSeleccionada]);

    const cargarTareas = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8080/api_Almacenadora/v1/tareas/listar');
            setTareas(response.data.tareas);
        } catch (error) {
            console.error('Error al obtener las tareas:', error);
        }
    };

    const handleUpdate = tarea => {
        setModalVisible(true);
        setTareaSeleccionada(tarea);
        setTareaEditada({
            ...tarea,
            fechaInicio: tarea.fechaInicio ? tarea.fechaInicio.substring(0, 16) : '',
            fechaFinal: tarea.fechaFinal ? tarea.fechaFinal.substring(0, 16) : '',
            persona: tarea.persona ? tarea.persona : ''
        });
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        setTareaSeleccionada(null);
        setTareaEditada({
            nombre: '',
            descripcion: '',
            fechaInicio: '',
            fechaFinal: '',
            persona: ''
        });
    };

    const handleEdit = async () => {
        try {
            const { _id, ...datosActualizados } = tareaEditada;
            await axios.put(`http://127.0.0.1:8080/api_Almacenadora/v1/tareas/editar/${_id}`, datosActualizados);
            setModalVisible(false);
            setTareaSeleccionada(null);
            setTareaEditada({
                nombre: '',
                descripcion: '',
                fechaInicio: '',
                fechaFinal: '',
                persona: ''
            });
            cargarTareas();
        } catch (error) {
            console.error('Error al actualizar la tarea:', error);
        }
    };

    const handleChangeEdit = e => {
        const { name, value } = e.target;

        if (name === "fechaInicio" && value > tareaEditada.fechaFinal) {
            setTareaEditada(prevState => ({
                ...prevState,
                [name]: value,
                fechaFinal: value
            }));
        } else if (name === "fechaFinal" && value < tareaEditada.fechaInicio) {
            setTareaEditada(prevState => ({
                ...prevState,
                [name]: value,
                fechaInicio: value
            }));
        } else {
            setTareaEditada(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleSubmitAgregar = async e => {
        e.preventDefault();
        try {
            await axios.post('http://127.0.0.1:8080/api_Almacenadora/v1/tareas/agregar', tareaAgregada);
            setTareaAgregada({
                nombre: '',
                descripcion: '',
                fechaInicio: '',
                fechaFinal: '',
                persona: '',
                estado: ''
            });
            cargarTareas();
        } catch (error) {
            console.error('Error al agregar la nueva tarea:', error);
        }
    };

    const handleChangeAgregar = e => {
        const { name, value } = e.target;

        if (name === "fechaInicio" && value > tareaAgregada.fechaFinal) {
            setTareaAgregada(prevState => ({
                ...prevState,
                [name]: value,
                fechaFinal: value
            }));
        } else if (name === "fechaFinal" && value < tareaAgregada.fechaInicio) {
            setTareaAgregada(prevState => ({
                ...prevState,
                [name]: value,
                fechaInicio: value
            }));
        } else {
            setTareaAgregada(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleDelete = async id => {
        try {
            await axios.delete(`http://127.0.0.1:8080/api_Almacenadora/v1/tareas/eliminar/${id}`);
            cargarTareas();
        } catch (error) {
            console.error('Error al eliminar la tarea:', error);
        }
    };

    const handleEstado = async (id, estadoActual) => {
        try {
            const nuevoEstado = estadoActual.toLowerCase() === 'completo' ? 'incompleto' : 'completo';
            await axios.put(`http://127.0.0.1:8080/api_Almacenadora/v1/tareas/editarEstado/${id}`, { estado: nuevoEstado });
            cargarTareas();
        } catch (error) {
            console.error('Error al cambiar el estado de la tarea:', error);
        }
    };

    const handleBack = () => {
        window.history.back(); // Regresar a la página anterior
    };

    return (
        <div className="container mt-5">
            <h2>Agregar Tarea</h2>
            <form onSubmit={handleSubmitAgregar} className="row g-3">
                <div className="col-md-6">
                    <label className="form-label">Nombre</label>
                    <input
                        type="text"
                        name="nombre"
                        value={tareaAgregada.nombre}
                        onChange={handleChangeAgregar}
                        className="form-control"
                        required
                    />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Descripción</label>
                    <input
                        type="text"
                        name="descripcion"
                        value={tareaAgregada.descripcion}
                        onChange={handleChangeAgregar}
                        className="form-control"
                        required
                    />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Fecha de inicio</label>
                    <input
                        type="datetime-local"
                        name="fechaInicio"
                        value={tareaAgregada.fechaInicio}
                        onChange={handleChangeAgregar}
                        className="form-control"
                        required
                    />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Fecha final</label>
                    <input
                        type="datetime-local"
                        name="fechaFinal"
                        value={tareaAgregada.fechaFinal}
                        onChange={handleChangeAgregar}
                        className="form-control"
                        required
                    />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Persona asignada</label>
                    <input
                        type="text"
                        name="persona"
                        value={tareaAgregada.persona}
                        onChange={handleChangeAgregar}
                        className="form-control"
                        required
                    />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Estado</label>
                    <select
                        name="estado"
                        value={tareaAgregada.estado}
                        onChange={handleChangeAgregar}
                        className="form-select"
                        required
                    >
                        <option value="">Seleccione...</option>
                        <option value="incompleto">Incompleto</option>
                        <option value="completo">Completo</option>
                    </select>
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Agregar</button>
                </div>
            </form>

            <h2 className="mt-5">Tareas...</h2>
            <div className="row">
                {tareas.map((tarea, index) => (
                    <div key={index} className="col-md-4 mb-3">
                        <div className="tarjeta-tarea">
                            <h3>{tarea.nombre}</h3>
                            <p><strong>Descripción:</strong> {tarea.descripcion}</p>
                            <p><strong>Fecha de inicio:</strong> {tarea.fechaInicio}</p>
                            <p><strong>Fecha final:</strong> {tarea.fechaFinal}</p>
                            <p><strong>Persona asignada:</strong> {tarea.persona}</p>
                            <p><strong>Estado:</strong> {tarea.estado}</p>
                            <div className="botones-tarjeta">
                                <Button variant="primary" onClick={() => handleUpdate(tarea)}>Actualizar</Button>{' '}
                                <Button variant="danger" onClick={() => handleDelete(tarea._id)}>Eliminar</Button>{' '}
                                <Button variant="info" onClick={() => handleEstado(tarea._id, tarea.estado)}>Cambiar Estado</Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>


            <Modal show={modalVisible} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Actualizar Tarea</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleEdit}>
                        <div className="mb-3">
                            <label className="form-label">Nombre:</label>
                            <input
                                type="text"
                                name="nombre"
                                value={tareaEditada.nombre}
                                onChange={handleChangeEdit}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Descripción:</label>
                            <input
                                type="text"
                                name="descripcion"
                                value={tareaEditada.descripcion}
                                onChange={handleChangeEdit}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Fecha de inicio:</label>
                            <input
                                type="datetime-local"
                                name="fechaInicio"
                                value={tareaEditada.fechaInicio}
                                onChange={handleChangeEdit}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Fecha final:</label>
                            <input
                                type="datetime-local"
                                name="fechaFinal"
                                value={tareaEditada.fechaFinal}
                                onChange={handleChangeEdit}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Persona asignada:</label>
                            <input
                                type="text"
                                name="persona"
                                value={tareaEditada.persona}
                                onChange={handleChangeEdit}
                                className="form-control"
                                required
                            />
                        </div>
                        <Button variant="primary" type="submit">
                            Actualizar
                        </Button>
                    </form>
                </Modal.Body>
            </Modal>

            <Button variant="secondary" onClick={handleBack}>Regresar</Button>
        </div>
    );
};
