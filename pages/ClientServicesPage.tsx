import React, { useState } from 'react';
import Header from '../components/Header';
import ToolCard from '../components/ToolCard';
import Modal from '../components/Modal';
import Button from '../components/Button';
import ServiceDetail from '../components/ServiceDetail';
import { CLIENT_SERVICES, PRICING_PACKAGES, CUSTOM_SOLUTIONS } from '../data/clientServicesData';
import type { ServiceModalData } from '../types';

interface ClientServicesPageProps {
  onBackToDashboard: () => void;
}

const ClientServicesPage: React.FC<ClientServicesPageProps> = ({ onBackToDashboard }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState<ServiceModalData | null>(null);

    const openServiceModal = (data: ServiceModalData) => {
        setModalData(data);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalData(null);
    };

    const getModalTitle = (data: ServiceModalData | null): string => {
        if (!data) {
            return '';
        }
        if ('packageTitle' in data) {
            return data.packageTitle || data.title || '';
        }
        return data.title || '';
    };

    const allClientServices = [...CLIENT_SERVICES, ...PRICING_PACKAGES, CUSTOM_SOLUTIONS];

    return (
        <>
            <div className="w-full max-w-7xl mx-auto pb-24 sm:pb-0 animate-fade-in">
                <Header
                    title="Client Services"
                    subtitle="Explore our comprehensive digital marketing solutions for local businesses."
                />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {allClientServices.map(service => (
                        <ToolCard
                            key={service.id}
                            icon={service.icon}
                            title={service.title}
                            description={service.shortDescription}
                            onClick={() => openServiceModal(service)}
                            colorScheme={service.colorScheme}
                        />
                    ))}
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={closeModal} title={getModalTitle(modalData)}>
                {modalData && <ServiceDetail data={modalData} />}
            </Modal>
            
            <div className="sm:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/80 dark:bg-background/80 border-t border-gray-200 dark:border-secondary-accent z-10 backdrop-blur-sm">
                <Button onClick={onBackToDashboard} variant="secondary">
                    &larr; Back to Dashboard
                </Button>
            </div>
        </>
    );
};

export default ClientServicesPage;