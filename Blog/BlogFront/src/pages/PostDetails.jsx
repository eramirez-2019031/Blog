import React, { useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar';
import { useProjects } from '../hooks/useProject';
import { useParams } from 'react-router-dom';
import { Card } from '../components/Card';
import { Button } from '@headlessui/react';
import './dos.css';

import projectImage from '../assets/img/Info.png'; // Ruta relativa de la imagen descargada

export const PostDetails = () => {
    const { projectId } = useParams();
    const { findByIdProject, isFetching, projects } = useProjects();

    useEffect(() => {
        findByIdProject(projectId);
    }, [projectId]);

    const project = projects.find(proj => proj._id === projectId);

    return (
        <>
            <Navbar />
            <div className="container mx-auto mt-8">
                <div className="flex flex-wrap justify-between">
                    <div className="w-full md:w-8/12 px-4 mb-8">
                        <img src={projectImage} className="w-full h-64 object-cover rounded" alt="Project" />
                        {project && (
                            <>
                                <h2 className="text-4xl font-bold mt-4 mb-2">{project.title}</h2>
                                <p className="text-description">{project.description}</p>
                                <a href={project.code} className="Get-project"><Button> Obtener Proyecto</Button></a>
                                <a href={project.code} className="Get-project"><Button> Obtener Proyecto</Button></a>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};
