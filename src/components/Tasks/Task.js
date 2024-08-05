import React from 'react';

const TaskModal = ({ task, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-1/3 shadow-lg">
        <button className="absolute top-2 right-2 text-gray-500" onClick={onClose}>&times;</button>
        <h2 className="text-xl font-bold mb-4">{task.title}</h2>
        <p className="text-gray-700 mb-4">ID: {task.id}</p>
        <p className="text-gray-700 mb-4">Assigned To: {task.assignedTo}</p>
        <p className="text-gray-700 mb-4">Summary: {task.summary}</p>
        <div className="comments-section">
          <h3 className="text-lg font-semibold mb-2">Comments</h3>
          {task.comments.map((comment, index) => (
            <div key={index} className="bg-gray-100 rounded-lg p-2 mb-2">
              <p className="text-gray-800">{comment.text}</p>
              {comment.image && <img src={comment.image} alt="comment" className="mt-2 rounded" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
