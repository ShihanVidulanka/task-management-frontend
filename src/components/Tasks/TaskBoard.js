// import React, { useState, useEffect } from 'react';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// import axios from 'axios';
// import { useAuth } from '../../contexts/AuthContext';
// import TaskModal from './Task';

// const KanbanBoard = () => {
//   const { token } = useAuth();
//   const [columns, setColumns] = useState({});
//   const [tasks, setTasks] = useState([]);
//   const [selectedTask, setSelectedTask] = useState(null);

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   const fetchTasks = async () => {
//     try {
//       const response = await axios.get('/api/tasks', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const tasks = response.data;
//       const columns = tasks.reduce((acc, task) => {
//         const { status } = task;
//         if (!acc[status]) acc[status] = [];
//         acc[status].push(task);
//         return acc;
//       }, {});
//       setColumns(columns);
//       setTasks(tasks);
//     } catch (error) {
//       console.error('Error fetching tasks:', error);
//     }
//   };

//   const onDragEnd = (result) => {
//     const { destination, source, draggableId } = result;
//     if (!destination) return;
//     if (destination.droppableId === source.droppableId && destination.index === source.index) return;

//     const sourceColumn = columns[source.droppableId];
//     const destinationColumn = columns[destination.droppableId];

//     const [movedTask] = sourceColumn.splice(source.index, 1);
//     destinationColumn.splice(destination.index, 0, movedTask);

//     setColumns({
//       ...columns,
//       [source.droppableId]: sourceColumn,
//       [destination.droppableId]: destinationColumn,
//     });

//     updateTaskStatus(draggableId, destination.droppableId);
//   };

//   const updateTaskStatus = async (taskId, newStatus) => {
//     try {
//       await axios.put(`/api/tasks/${taskId}`, { status: newStatus }, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//     } catch (error) {
//       console.error('Error updating task status:', error);
//     }
//   };

//   const openTaskModal = (task) => {
//     setSelectedTask(task);
//   };

//   const closeTaskModal = () => {
//     setSelectedTask(null);
//   };

//   return (
//     <div className="p-4 bg-gray-100 min-h-screen">
//       <DragDropContext onDragEnd={onDragEnd}>
//         <div className="flex space-x-4">
//           {Object.keys(columns).map((columnId) => (
//             <Droppable droppableId={columnId} key={columnId}>
//               {(provided) => (
//                 <div
//                   className="flex-1 bg-white rounded-lg shadow-md p-4"
//                   ref={provided.innerRef}
//                   {...provided.droppableProps}
//                 >
//                   <h3 className="text-lg font-semibold mb-4">{columnId}</h3>
//                   {columns[columnId].map((task, index) => (
//                     <Draggable draggableId={task.id.toString()} index={index} key={task.id}>
//                       {(provided) => (
//                         <div
//                           className="bg-blue-100 rounded-lg p-4 mb-4 shadow-md cursor-pointer"
//                           ref={provided.innerRef}
//                           {...provided.draggableProps}
//                           {...provided.dragHandleProps}
//                           onClick={() => openTaskModal(task)}
//                         >
//                           <h4 className="text-md font-semibold">{task.title}</h4>
//                           <p className="text-sm text-gray-600">{task.assignedTo}</p>
//                         </div>
//                       )}
//                     </Draggable>
//                   ))}
//                   {provided.placeholder}
//                 </div>
//               )}
//             </Droppable>
//           ))}
//         </div>
//       </DragDropContext>
//       {selectedTask && <TaskModal task={selectedTask} onClose={closeTaskModal} />}
//     </div>
//   );
// };

// export default KanbanBoard;

// components/KanbanBoard.js

import React from 'react';

const KanbanBoard = ({ projects, onProjectSelect }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {projects.map((project) => (
        <div
          key={project.id}
          className="border rounded-lg p-4 cursor-pointer hover:shadow-lg"
          onClick={() => onProjectSelect(project)}
        >
          <h3 className="text-xl font-bold">{project.name}</h3>
          <p>{project.description}</p>
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
