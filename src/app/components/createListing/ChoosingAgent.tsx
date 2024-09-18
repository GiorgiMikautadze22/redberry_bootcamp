"use client"

import { fetchAgents } from '@/app/hooks/fetch';
import { Agents, FormData } from '@/app/interfaces/interface';
import React, { useEffect, useState } from 'react'

interface Props {
    formData: FormData;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

interface Agent {
    id: number;
    name: string;
    surname: string;
    avatar: string;
}

const ChoosingAgent = ({ formData, setFormData }: Props) => {
    const [agents, setAgents] = useState<Agent[]>([]);

    useEffect(() => {
        const fetchDataFromApi = async () => {
            try {
                const agentData = await fetchAgents();
                setAgents(agentData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchDataFromApi();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData(prevData => ({
            ...prevData,
            agent_id: Number(e.target.value)
        }));
    };

    return (
        <div>
            <p className='text-[16px] font-medium font-helveticaNeue uppercase'>აგენტი</p>
            <div>
                <label htmlFor="agent_id" className="block text-[14px] font-bold text-gray-700">აირჩიე</label>
                <select
                    required
                    id="agent_id"
                    name="agent_id"
                    value={formData.agent_id || ''}
                    onChange={handleChange}
                    className="mt-1 block w-[350px] px-3 h-[42px] py-2 border border-[#808A93] rounded-md"
                >
                    <option value="">აირჩიეთ აგენტი</option>
                    {agents.map((agent) => (
                        <option key={agent.id} value={agent.id}>
                            {agent.name + " " + agent.surname}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    )
}

export default ChoosingAgent
