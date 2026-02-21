import React, { useState } from 'react'

const taskIntake = () => {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = () => {
        if (!task.trim()) return;

        const newTask = {
            id: Date.now(),
            title: task,
            description: description,
            completed: false
        };

        setTasks([...tasks, newTask]);
        setTask("");
        setDescription("");
    };

    const handleDelete = (id) => {
        setTasks(tasks.filter(t => t.id !== id));
    };

    const toggleComplete = (id) => {
        setTasks(tasks.map(t =>
            t.id === id ? { ...t, completed: !t.completed } : t
        ));
    };

    return (
        <div className="relative min-h-screen bg-gray-950 overflow-hidden text-white font-sans selection:bg-blue-500/30">
            {/* Background Decorations */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] animate-pulse-glow" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] animate-pulse-glow" />
            <div className="absolute top-[20%] right-[10%] w-[20%] h-[20%] bg-indigo-600/10 rounded-full blur-[80px] animate-blob" />

            <div className="relative z-10 max-w-2xl mx-auto px-4 py-12 md:py-20 flex flex-col gap-10">
                <header className="space-y-3 text-center">
                    <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-widest uppercase mb-2 animate-bounce">
                        Next-Gen Workflow
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight bg-gradient-to-br from-white via-blue-100 to-blue-400 bg-clip-text text-transparent">
                        Task <span className="text-blue-500">Flow</span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-md mx-auto">
                        Streamline your productivity with a seamless, high-performance interface.
                    </p>
                </header>

                {/* Intake Form */}
                <div className="glass p-1 rounded-3xl">
                    <div className="bg-gray-900/40 backdrop-blur-2xl p-6 rounded-[22px] border border-white/5 space-y-4">
                        <div className="flex flex-col md:flex-row gap-3">
                            <input
                                type="text"
                                placeholder="Add a new mission..."
                                value={task}
                                onChange={(e) => setTask(e.target.value)}
                                className="flex-1 p-4 bg-white/[0.03] rounded-2xl border border-white/10 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder:text-gray-600 text-lg"
                            />
                            <input
                                type="text"
                                placeholder="Details (optional)"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="flex-1 p-4 bg-white/[0.03] rounded-2xl border border-white/10 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder:text-gray-600 text-lg"
                            />
                        </div>
                        <button
                            onClick={handleSubmit}
                            className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all active:scale-[0.98] shadow-[0_0_20px_rgba(37,99,235,0.3)] flex items-center justify-center gap-2 group"
                        >
                            <span>Initiate Task</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Task List */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between px-2">
                        <h2 className="text-xl font-bold flex items-center gap-3">
                            <span className="w-2 h-8 bg-blue-500 rounded-full" />
                            Active Stream
                        </h2>
                        <span className="text-sm text-gray-500 font-mono">{tasks.length} {tasks.length === 1 ? 'OBJECTIVE' : 'OBJECTIVES'}</span>
                    </div>

                    {tasks.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 glass rounded-3xl border-dashed border-white/10 opacity-60">
                            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                </svg>
                            </div>
                            <p className="text-gray-500 font-medium">System idle. Awaiting command...</p>
                        </div>
                    ) : (
                        <div className="grid gap-4">
                            {tasks.map((t) => (
                                <div
                                    key={t.id}
                                    className={`glass rounded-3xl overflow-hidden group transition-all duration-500 hover:shadow-blue-500/5 ${t.completed ? 'opacity-50' : ''}`}
                                >
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 gap-6 glass-hover">
                                        <div className="flex-1 min-w-0 flex items-start gap-4">
                                            <div className={`mt-1.5 w-3 h-3 rounded-full flex-shrink-0 animate-pulse ${t.completed ? 'bg-gray-600' : 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]'}`} />
                                            <div>
                                                <h3 className={`text-xl font-bold transition-all duration-300 ${t.completed ? 'line-through text-gray-500' : 'text-gray-100'}`}>
                                                    {t.title}
                                                </h3>
                                                <p className={`mt-1 text-gray-400 font-medium leading-relaxed ${t.completed ? 'line-through text-gray-600' : ''}`}>
                                                    {t.description}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex gap-3 w-full sm:w-auto mt-4 sm:mt-0">
                                            <button
                                                onClick={() => toggleComplete(t.id)}
                                                className={`flex-1 sm:flex-none p-3 rounded-2xl flex items-center justify-center transition-all ${t.completed
                                                        ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                                        : 'bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white border border-blue-500/20'
                                                    }`}
                                                title={t.completed ? 'Undo' : 'Mark as Complete'}
                                            >
                                                {t.completed ? (
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                                                ) : (
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                                )}
                                                <span className="sm:hidden ml-2 font-bold">{t.completed ? 'Undo' : 'Done'}</span>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(t.id)}
                                                className="flex-1 sm:flex-none p-3 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white border border-red-500/20 rounded-2xl flex items-center justify-center transition-all"
                                                title="Delete Objective"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                <span className="sm:hidden ml-2 font-bold">Remove</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default taskIntake