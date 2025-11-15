import React, { useState, useMemo } from 'react';
import Header from '../components/Header';
import Button from '../components/Button';
import Modal from '../components/Modal';
import { MOCK_CALENDAR_EVENTS, PLATFORM_INFO, STATUS_INFO } from '../constants';
import type { CalendarEvent } from '../types';

const CalendarHeader: React.FC<{
    currentDate: Date;
    onPrevMonth: () => void;
    onNextMonth: () => void;
    onToday: () => void;
}> = ({ currentDate, onPrevMonth, onNextMonth, onToday }) => (
    <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-primary-text font-serif">
            {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
        </h2>
        <div className="flex items-center gap-2">
            <Button onClick={onToday} variant="secondary" className="w-auto py-2 px-3 text-sm">Today</Button>
            <button onClick={onPrevMonth} className="p-2 rounded-md border border-gray-300 dark:border-secondary-accent hover:bg-gray-100 dark:hover:bg-secondary-accent transition-colors" aria-label="Previous month"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg></button>
            <button onClick={onNextMonth} className="p-2 rounded-md border border-gray-300 dark:border-secondary-accent hover:bg-gray-100 dark:hover:bg-secondary-accent transition-colors" aria-label="Next month"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg></button>
        </div>
    </div>
);

interface ContentCalendarToolProps {
    onBackToDashboard: () => void;
}

const ContentCalendarTool: React.FC<ContentCalendarToolProps> = ({ onBackToDashboard }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [events, setEvents] = useState<CalendarEvent[]>(MOCK_CALENDAR_EVENTS);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const handlePrevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    const handleNextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    const handleToday = () => setCurrentDate(new Date());

    const openAddModal = (date: Date) => {
        setSelectedDate(date);
        setIsModalOpen(true);
    };

    const calendarGrid = useMemo(() => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const grid: (Date | null)[] = [];
        // Add padding days from previous month
        for (let i = 0; i < firstDayOfMonth; i++) {
            grid.push(null);
        }
        // Add days of the current month
        for (let i = 1; i <= daysInMonth; i++) {
            grid.push(new Date(year, month, i));
        }
        return grid;
    }, [currentDate]);

    const isSameDay = (d1: Date, d2: Date) => d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
    const today = new Date();

    return (
        <>
            <div className="w-full max-w-7xl mx-auto pb-24 sm:pb-0 animate-fade-in">
                <Header
                    title={<>Content <span className="text-accent-orange">Calendar</span></>}
                    subtitle="Plan and visualize your social media and blog content."
                />

                <div className="p-6 bg-white dark:bg-background border border-dashed border-gray-300 dark:border-secondary-accent rounded-lg">
                    <CalendarHeader currentDate={currentDate} onPrevMonth={handlePrevMonth} onNextMonth={handleNextMonth} onToday={handleToday} />
                    <div className="grid grid-cols-7 gap-px bg-gray-300 dark:bg-secondary-accent border border-gray-300 dark:border-secondary-accent rounded-lg overflow-hidden">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                            <div key={day} className="text-center text-xs font-semibold text-gray-700 dark:text-secondary-text py-3 bg-white dark:bg-background">
                                {day}
                            </div>
                        ))}
                        {calendarGrid.map((date, index) => {
                            const isToday = date && isSameDay(date, today);
                            const eventsForDay = date ? events.filter(e => isSameDay(e.date, date)) : [];
                            return (
                                <div
                                    key={index}
                                    onClick={() => date && openAddModal(date)}
                                    className="relative bg-white dark:bg-background min-h-[120px] p-2 flex flex-col group hover:bg-gray-100/50 dark:hover:bg-secondary-accent/50 transition-colors duration-200 cursor-pointer"
                                >
                                    {date && (
                                        <>
                                            <time dateTime={date.toISOString()} className={`text-sm font-semibold transition-all duration-200 ${isToday ? 'bg-accent text-white dark:text-background rounded-full flex items-center justify-center h-7 w-7' : 'text-gray-900 dark:text-primary-text group-hover:scale-110'}`}>
                                                {date.getDate()}
                                            </time>
                                            <div className="flex-grow mt-1 space-y-1 overflow-y-auto">
                                                {eventsForDay.map(event => (
                                                    <div key={event.id} className={`text-xs p-1.5 rounded-md ${PLATFORM_INFO[event.platform].color}`}>
                                                        <div className="flex items-center gap-1.5">
                                                            <span className={`h-2 w-2 rounded-full ${STATUS_INFO[event.status].color} flex-shrink-0`}></span>
                                                            <span className={`truncate font-medium ${PLATFORM_INFO[event.platform].textColor}`}>{event.title}</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <button onClick={(e) => { e.stopPropagation(); openAddModal(date); }} className="absolute top-2 right-2 h-6 w-6 rounded-full bg-gray-900 text-white dark:bg-primary-accent dark:text-background items-center justify-center opacity-0 group-hover:opacity-100 hidden sm:flex transition-opacity" aria-label="Add event">
                                               +
                                            </button>
                                        </>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={`Add Post for ${selectedDate?.toLocaleDateString()}`}>
                <form className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-600 dark:text-secondary-text mb-1">Title</label>
                        <input type="text" id="title" placeholder="e.g., Weekly product update" className="w-full p-3 bg-white dark:bg-background border border-gray-300 dark:border-secondary-accent text-gray-900 dark:text-primary-text rounded-lg focus:ring-2 focus:ring-accent focus:border-accent" />
                    </div>
                    <div>
                        <label htmlFor="platform" className="block text-sm font-medium text-gray-600 dark:text-secondary-text mb-1">Platform</label>
                        <select id="platform" className="w-full p-3 bg-white dark:bg-background border border-gray-300 dark:border-secondary-accent text-gray-900 dark:text-primary-text rounded-lg focus:ring-2 focus:ring-accent focus:border-accent appearance-none">
                           {Object.keys(PLATFORM_INFO).map(p => <option key={p}>{p}</option>)}
                        </select>
                    </div>
                     <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-600 dark:text-secondary-text mb-1">Status</label>
                        <select id="status" className="w-full p-3 bg-white dark:bg-background border border-gray-300 dark:border-secondary-accent text-gray-900 dark:text-primary-text rounded-lg focus:ring-2 focus:ring-accent focus:border-accent appearance-none">
                           {Object.keys(STATUS_INFO).map(s => <option key={s}>{s}</option>)}
                        </select>
                    </div>
                    <div className="pt-2">
                        <Button type="button" onClick={() => setIsModalOpen(false)}>Save Post</Button>
                    </div>
                </form>
            </Modal>

            {/* Mobile-only back button */}
            <div className="sm:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/80 dark:bg-background/80 border-t border-gray-200 dark:border-secondary-accent z-10 backdrop-blur-sm">
                <Button onClick={onBackToDashboard} variant="secondary">
                    &larr; Back to Dashboard
                </Button>
            </div>
        </>
    );
};

export default ContentCalendarTool;