import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useProjects } from '../hooks/useProject';
import './card.css'
import { MdDeleteForever } from "react-icons/md";


export const Card = ({ data, updateProjects }) => {
    const { _id, title, description, code, authorName, createdAt } = data;
    const { deleteProject } = useProjects()
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    const OnDelete = async () => {
        await deleteProject(_id);
        updateProjects();
    }

    return (
        <div className="big-container">
            
            <div className="author-1">
                <p className="author-2">
                    <span className="author-3">
                        {authorName}
                    </span>
                </p>
                <Link to={`/post/${_id}`}
                    className="title-home">{title}</Link>
                <p className="desc">
                    {description}
                </p>
            </div>
            <div className="when">
                <span href="#" className="onDate">
                    <span className="ml-2">{formatDate(createdAt)}</span>
                </span>
                <div>
                <button className="delete-button" onClick={OnDelete}><MdDeleteForever /></button>
                </div>
            </div>
        </div>
    )
}
