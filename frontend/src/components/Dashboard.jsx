import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getLeads, deleteLead } from '../utils/api';
import { LogOut, Users, PlusCircle } from 'lucide-react';
import LeadModal from './LeadModal';
import AddLeadModal from './AddLeadModal';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [leads, setLeads] = useState([]);
  const [selectedLead, setSelectedLead] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const navigate = useNavigate();

  const fetchLeads = async () => {
    try {
      const data = await getLeads(user.token);
      setLeads(data);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) handleLogout();
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this lead forever?')) {
      try {
        await deleteLead(id, user.token);
        fetchLeads();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Users size={32} color="#4F46E5" />
          <h1 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Mini CRM</h1>
        </div>
        <div className="nav-actions">
          <span style={{ color: 'var(--text-muted)' }}>{user.email}</span>
          <button className="btn-secondary" onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <LogOut size={16} /> Logout
          </button>
        </div>
      </header>

      <div className="glass-panel" style={{ padding: '2rem' }}>
        <h2 style={{ marginBottom: '1.5rem', fontSize: '1.25rem', display: 'flex', justifyContent: 'space-between' }}>
          Recent Leads
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 400, color: 'var(--text-muted)' }}>Total: {leads.length}</span>
            <button className="btn-primary" onClick={() => setIsAdding(true)} style={{ padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <PlusCircle size={16} /> Add Lead
            </button>
          </div>
        </h2>
        <div className="leads-table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Source</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {leads.length === 0 && (
                <tr><td colSpan="6" style={{ textAlign: 'center', color: 'var(--text-muted)', paddingTop: '2rem' }}>No leads found</td></tr>
              )}
              {leads.map(lead => (
                <tr key={lead._id}>
                  <td style={{ fontWeight: 500 }}>{lead.name}</td>
                  <td style={{ color: 'var(--text-muted)' }}>{lead.email}</td>
                  <td>{lead.source}</td>
                  <td>
                    <span className={`badge badge-${lead.status}`}>{lead.status}</span>
                  </td>
                  <td style={{ color: 'var(--text-muted)' }}>{new Date(lead.createdAt).toLocaleDateString()}</td>
                  <td style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="btn-secondary" onClick={() => setSelectedLead(lead)}>Manage</button>
                    <button className="btn-secondary" style={{ color: 'var(--danger)', borderColor: 'var(--danger)' }} onClick={() => handleDelete(lead._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedLead && (
        <LeadModal lead={selectedLead} onClose={() => setSelectedLead(null)} onUpdate={fetchLeads} token={user.token} />
      )}
      {isAdding && (
        <AddLeadModal onClose={() => setIsAdding(false)} onUpdate={fetchLeads} token={user.token} />
      )}
    </div>
  );
};

export default Dashboard;
