from flask import Blueprint, request, jsonify
from models import db, Lead

leads = Blueprint('leads', __name__)


@leads.route('/', methods=['GET'])
def get_leads():
    leads = Lead.query.order_by(Lead.created_at.desc()).all()
    return jsonify([lead.to_dict() for lead in leads]), 200


@leads.route('/create', methods=['GET', 'POST'])
def create_lead():
    if request.method == 'GET':
        return jsonify({'message': 'Please send a POST request with lead data to create a lead.'}), 200

    data = request.get_json()
    new_lead = Lead(
        name=data['name'],
        email=data['email'],
        status='new',
        source=data.get('source')
    )
    db.session.add(new_lead)
    db.session.commit()
    return jsonify({'message': 'Lead created successfully'}), 201

@leads.route('/<int:lead_id>', methods=['PUT'])
def update_lead(lead_id):
    leads = Lead.query.get_or_404(lead_id)
    data = request.get_json()
    
    leads.status = data.get('status')
    
    db.session.commit()
    return jsonify({'message': 'Lead updated successfully'}), 200

@leads.route('/<int:lead_id>', methods=['POST'])
def add_note_to_lead(lead_id):
    lead = Lead.query.get_or_404(lead_id)
    data = request.get_json()
    
    note = data.get('note')
    if note:
        lead.notes.append(note)
        db.session.commit()
        return jsonify({'message': 'Note added to lead successfully'}), 200
    else:
        return jsonify({'message': 'Note content is required'}), 400

@leads.route('/<int:lead_id>', methods=['DELETE'])
def delete_lead(lead_id):
    lead = Lead.query.get_or_404(lead_id)
    db.session.delete(lead)
    db.session.commit()
    return jsonify({'message': 'Lead deleted successfully'}), 200