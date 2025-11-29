import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  source?: string;        // optional in case some leads don't have a source
  status: string;
  priority?: string;      // optional
  value?: string;         // budget/value
  assignedTo?: string;    // agent/officer
  createdAt?: string;     // optional
  description?: string;

  // Real Estate specific
  propertyType?: string;
  location?: string;
  agent?: string;
  agentAvatar?: string;

  // Business Setup specific
  nationality?: string;
  service?: string;
  jurisdiction?: string;
  visas?: string;
  activity?: string;
  officer?: string;

  lastContact?: string;    // last contacted time
}

export interface Property {
  id: string;
  title: string;
  type: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  status: string;
  image: string;
  developer?: string;
  features?: string[];
  description?: string;
}

export interface Deal {
  id: string;
  title: string;
  client: string;
  property: string;
  value: number;
  stage: string;
  probability: number;
  expectedClose: string;
  assignedTo: string;
  status: string;
}

export interface Pledge {
  id: string;
  clientName: string;
  property: string;
  amount: string;
  pledgeDate: string;
  expectedClosing: string;
  status: string;
  paidAmount: string;
  pendingAmount: string;
  agent: string;
  agentAvatar: string;
}

export interface Task {
  task: string ;
  entityId: string;
 
  completedAt: Date | string | null;
  createdAt: Date | null;
  dueTime: string;
  id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
  dueDate: string;
  entityType?: "lead" | "inquiry";
  assignedTo: string;
  relatedTo?: string;
  type?: string;
}

export interface Viewing {
  id: string;
  property: string;
  client: string;
  date: string;
  time: string;
  status: string;
  agent: string;
  notes?: string;
}

export interface FollowUp {
  id: string;
  lead: string;
  type: string;
  date: string;
  notes: string;
  status: string;
  assignedTo: string;
  priority: string;
}

interface CRMContextType {
  // Leads
  leads: Lead[];
  addLead: (lead: Omit<Lead, 'id' | 'createdAt'>) => void;
  updateLead: (id: string, lead: Partial<Lead>) => void;
  deleteLead: (id: string) => void;
  
  // Properties
  properties: Property[];
  addProperty: (property: Omit<Property, 'id'>) => void;
  updateProperty: (id: string, property: Partial<Property>) => void;
  deleteProperty: (id: string) => void;
  
  // Deals
  deals: Deal[];
  addDeal: (deal: Omit<Deal, 'id'>) => void;
  updateDeal: (id: string, deal: Partial<Deal>) => void;
  deleteDeal: (id: string) => void;
  
  // Pledges
  pledges: Pledge[];
  addPledge: (pledge: Omit<Pledge, 'id'>) => void;
  updatePledge: (id: string, pledge: Partial<Pledge>) => void;
  deletePledge: (id: string) => void;
  
  // Tasks
  tasks: Task[];
  addTask: (task: Omit<Task, 'id'>) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  
  // Viewings
  viewings: Viewing[];
  addViewing: (viewing: Omit<Viewing, 'id'>) => void;
  updateViewing: (id: string, viewing: Partial<Viewing>) => void;
  deleteViewing: (id: string) => void;
  
  // Follow-ups
  followUps: FollowUp[];
  addFollowUp: (followUp: Omit<FollowUp, 'id'>) => void;
  updateFollowUp: (id: string, followUp: Partial<FollowUp>) => void;
  deleteFollowUp: (id: string) => void;
}

const CRMContext = createContext<CRMContextType | undefined>(undefined);

// Initial mock data
const initialLeads: Lead[] = [
  {
    id: 'L001',
    name: 'Ahmed Al-Mansouri',
    email: 'ahmed.mansouri@email.com',
    phone: '+971 50 123 4567',
    source: 'Website',
    status: 'New',
    priority: 'High',
    value: 'AED 2.5M',
    assignedTo: 'Sarah Johnson',
    createdAt: '2025-01-15',
    description: 'Looking for 4BR villa in Dubai Hills'
  },
  {
    id: 'L002',
    name: 'Fatima Hassan',
    email: 'fatima.h@email.com',
    phone: '+971 55 987 6543',
    source: 'Referral',
    status: 'Contacted',
    priority: 'Medium',
    value: 'AED 1.8M',
    assignedTo: 'Michael Chen',
    createdAt: '2025-01-14',
    description: 'Interested in Marina apartments'
  },
];

const initialProperties: Property[] = [
  {
    id: 'P001',
    title: 'Luxurious 4BR Villa',
    type: 'Villa',
    price: 4500000,
    location: 'Dubai Hills Estate',
    bedrooms: 4,
    bathrooms: 5,
    area: 3500,
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
    developer: 'Emaar Properties',
    features: ['Private Pool', 'Garden', 'Maid Room', 'Smart Home'],
    description: 'Stunning villa with modern amenities'
  },
  {
    id: 'P002',
    title: 'Modern 2BR Apartment',
    type: 'Apartment',
    price: 1800000,
    location: 'Dubai Marina',
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
    developer: 'Select Group',
    features: ['Sea View', 'Balcony', 'Gym Access', 'Pool'],
    description: 'Beautiful apartment with marina views'
  },
];

const initialDeals: Deal[] = [
  {
    id: 'D001',
    title: 'Villa Sale - Dubai Hills',
    client: 'Ahmed Al-Mansouri',
    property: 'Luxurious 4BR Villa',
    value: 4500000,
    stage: 'Negotiation',
    probability: 75,
    expectedClose: '2025-02-15',
    assignedTo: 'Sarah Johnson',
    status: 'Active'
  },
];

const initialPledges: Pledge[] = [
  {
    id: 'PLG-001',
    clientName: 'Mohammed Al-Rashid',
    property: 'Luxurious 4BR Villa - Dubai Hills Estate',
    amount: 'AED 2,500,000',
    pledgeDate: '2025-01-10',
    expectedClosing: '2025-02-15',
    status: 'Active',
    paidAmount: 'AED 250,000',
    pendingAmount: 'AED 2,250,000',
    agent: 'Sarah Johnson',
    agentAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
  },
];

const initialTasks: Task[] = [
  {
    id: 'T001',
    title: 'Follow up with Ahmed Al-Mansouri',
    description: 'Schedule property viewing',
    priority: 'High',
    status: 'Pending',
    dueDate: '2025-01-20',
    assignedTo: 'Sarah Johnson',
    relatedTo: 'L001',
    type: 'Follow-up',
    dueTime: '',
    task: "",
    entityId: "",
    completedAt: new Date(),
    createdAt: new Date(),
  },
];

const initialViewings: Viewing[] = [
  {
    id: 'V001',
    property: 'Luxurious 4BR Villa',
    client: 'Ahmed Al-Mansouri',
    date: '2025-01-20',
    time: '14:00',
    status: 'Scheduled',
    agent: 'Sarah Johnson',
    notes: 'Client interested in smart home features'
  },
];

const initialFollowUps: FollowUp[] = [
  {
    id: 'F001',
    lead: 'Ahmed Al-Mansouri',
    type: 'Phone Call',
    date: '2025-01-20',
    notes: 'Discuss financing options',
    status: 'Pending',
    assignedTo: 'Sarah Johnson',
    priority: 'High'
  },
];

export function CRMProvider({ children }: { children: ReactNode }) {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [deals, setDeals] = useState<Deal[]>(initialDeals);
  const [pledges, setPledges] = useState<Pledge[]>(initialPledges);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [viewings, setViewings] = useState<Viewing[]>(initialViewings);
  const [followUps, setFollowUps] = useState<FollowUp[]>(initialFollowUps);

  // Lead operations
  const addLead = (lead: Omit<Lead, 'id' | 'createdAt'>) => {
    const newLead: Lead = {
      ...lead,
      id: `L${String(leads.length + 1).padStart(3, '0')}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setLeads([newLead, ...leads]);
  };

  const updateLead = (id: string, leadUpdate: Partial<Lead>) => {
    setLeads(leads.map(lead => lead.id === id ? { ...lead, ...leadUpdate } : lead));
  };

  const deleteLead = (id: string) => {
    setLeads(leads.filter(lead => lead.id !== id));
  };

  // Property operations
  const addProperty = (property: Omit<Property, 'id'>) => {
    const newProperty: Property = {
      ...property,
      id: `P${String(properties.length + 1).padStart(3, '0')}`
    };
    setProperties([newProperty, ...properties]);
  };

  const updateProperty = (id: string, propertyUpdate: Partial<Property>) => {
    setProperties(properties.map(prop => prop.id === id ? { ...prop, ...propertyUpdate } : prop));
  };

  const deleteProperty = (id: string) => {
    setProperties(properties.filter(prop => prop.id !== id));
  };

  // Deal operations
  const addDeal = (deal: Omit<Deal, 'id'>) => {
    const newDeal: Deal = {
      ...deal,
      id: `D${String(deals.length + 1).padStart(3, '0')}`
    };
    setDeals([newDeal, ...deals]);
  };

  const updateDeal = (id: string, dealUpdate: Partial<Deal>) => {
    setDeals(deals.map(deal => deal.id === id ? { ...deal, ...dealUpdate } : deal));
  };

  const deleteDeal = (id: string) => {
    setDeals(deals.filter(deal => deal.id !== id));
  };

  // Pledge operations
  const addPledge = (pledge: Omit<Pledge, 'id'>) => {
    const newPledge: Pledge = {
      ...pledge,
      id: `PLG-${String(pledges.length + 1).padStart(3, '0')}`
    };
    setPledges([newPledge, ...pledges]);
  };

  const updatePledge = (id: string, pledgeUpdate: Partial<Pledge>) => {
    setPledges(pledges.map(pledge => pledge.id === id ? { ...pledge, ...pledgeUpdate } : pledge));
  };

  const deletePledge = (id: string) => {
    setPledges(pledges.filter(pledge => pledge.id !== id));
  };

  // Task operations
  const addTask = (task: Omit<Task, 'id'>) => {
    const newTask: Task = {
      ...task,
      id: `T${String(tasks.length + 1).padStart(3, '0')}`
    };
    setTasks([newTask, ...tasks]);
  };

  const updateTask = (id: string, taskUpdate: Partial<Task>) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, ...taskUpdate } : task));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Viewing operations
  const addViewing = (viewing: Omit<Viewing, 'id'>) => {
    const newViewing: Viewing = {
      ...viewing,
      id: `V${String(viewings.length + 1).padStart(3, '0')}`
    };
    setViewings([newViewing, ...viewings]);
  };

  const updateViewing = (id: string, viewingUpdate: Partial<Viewing>) => {
    setViewings(viewings.map(viewing => viewing.id === id ? { ...viewing, ...viewingUpdate } : viewing));
  };

  const deleteViewing = (id: string) => {
    setViewings(viewings.filter(viewing => viewing.id !== id));
  };

  // Follow-up operations
  const addFollowUp = (followUp: Omit<FollowUp, 'id'>) => {
    const newFollowUp: FollowUp = {
      ...followUp,
      id: `F${String(followUps.length + 1).padStart(3, '0')}`
    };
    setFollowUps([newFollowUp, ...followUps]);
  };

  const updateFollowUp = (id: string, followUpUpdate: Partial<FollowUp>) => {
    setFollowUps(followUps.map(fu => fu.id === id ? { ...fu, ...followUpUpdate } : fu));
  };

  const deleteFollowUp = (id: string) => {
    setFollowUps(followUps.filter(fu => fu.id !== id));
  };

  const value = {
    leads,
    addLead,
    updateLead,
    deleteLead,
    properties,
    addProperty,
    updateProperty,
    deleteProperty,
    deals,
    addDeal,
    updateDeal,
    deleteDeal,
    pledges,
    addPledge,
    updatePledge,
    deletePledge,
    tasks,
    addTask,
    updateTask,
    deleteTask,
    viewings,
    addViewing,
    updateViewing,
    deleteViewing,
    followUps,
    addFollowUp,
    updateFollowUp,
    deleteFollowUp,
  };

  return <CRMContext.Provider value={value}>{children}</CRMContext.Provider>;
}

export function useCRM() {
  const context = useContext(CRMContext);
  if (context === undefined) {
    throw new Error('useCRM must be used within a CRMProvider');
  }
  return context;
}
