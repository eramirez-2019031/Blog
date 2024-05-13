import React from 'react';
import { useForm } from 'react-hook-form';
import { useProjects } from '../hooks/useProject';
import './createProject.css'

export const CreateProject = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { createProject } = useProjects();

    const onSubmit = (data) => {
        console.log(data);
        createProject(data);
    };

    return (
        <div className="form-container">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="form-content"
                encType="multipart/form-data"
            >
                <h1 className="form-title">Create new project</h1>
                <div className="form-item">
                    <label
                        htmlFor="title"
                        className="form-label"
                    >
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        {...register('title', { required: true })}
                        className={`form-input ${errors.title ? 'form-error' : ''}`}
                        placeholder="Project Title"
                    />
                    {errors.title && <span className="form-error">Title is required</span>}
                </div>
                <div className="form-item">
                    <label
                        htmlFor="description"
                        className="form-label"
                    >
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        {...register('description', { required: true })}
                        className={`form-input ${errors.description ? 'form-error' : ''}`}
                        placeholder="Project Description"
                    />
                    {errors.description && <span className="form-error">Description is required</span>}
                </div>
                <div className="form-item">
                    <label
                        htmlFor="code"
                        className="form-label"
                    >
                        Code (URL)
                    </label>
                    <input
                        type="text"
                        id="code"
                        name="code"
                        {...register('code', { required: true })}
                        className={`form-input ${errors.code ? 'form-error' : ''}`}
                        placeholder="URL of the code"
                    />
                    {errors.code && <span className="form-error">Code (URL) is required</span>}
                </div>
                <div className="form-item">
                    <label
                        htmlFor="authorName"
                        className="form-label"
                    >
                        Author Name
                    </label>
                    <input
                        type="text"
                        id="authorName"
                        name="authorName"
                        {...register('authorName', { required: true })}
                        className={`form-input ${errors.authorName ? 'form-error' : ''}`}
                        placeholder="Your Name"
                    />
                    {errors.authorName && <span className="form-error">Author Name is required</span>}
                </div>
                
                <button
                    type="submit"
                    className="form-submit"
                >
                    Send
                </button>
            </form>
            <div className="form-info">
                <a
                    href="https://veilmail.io/irish-geoff"
                    className="form-link"
                    target="_blank"
                    rel="noreferrer"
                >
                </a>
            </div>
        </div>
    );
};
