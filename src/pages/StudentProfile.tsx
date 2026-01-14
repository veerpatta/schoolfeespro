import React from 'react';
import { useParams } from 'react-router-dom';

const StudentProfile: React.FC = () => {
    const { studentId } = useParams<{ studentId: string }>();
    return (
        <div style={{ padding: '20px' }}>
            <h1>Student Profile</h1>
            <p>Details for student ID: {studentId}</p>
        </div>
    );
};

export default StudentProfile;
