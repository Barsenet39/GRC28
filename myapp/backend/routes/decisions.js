import express from 'express';
import Joi from 'joi';
import Decision from '../models/Decision.js';
import Request from '../models/Request.js';

const router = express.Router();

// Validation schemas
const deputyDirectorSchema = Joi.object({
  requestId: Joi.string().trim().required(),
  status: Joi.string().valid('Accepted','Deputy_Rejected').required(),
  prioritydd: Joi.string().valid('high', 'medium', 'low').required(),
  commentsdd: Joi.string().trim().min(1).required().messages({
    'string.empty': 'Deputy Director comments cannot be empty',
    'any.required': 'Deputy Director comments are required',
  }),
  priority: Joi.any().forbidden(),
  comments: Joi.any().forbidden(),
});

const directorGeneralSchema = Joi.object({
  requestId: Joi.string().trim().required(),
  status: Joi.string().valid('Accepted', 'Rejected', ).required(),
  priority: Joi.string().valid('Assurance', 'BDPD', 'Both').when('status', {
    is: 'Accepted',
    then: Joi.required(),
    otherwise: Joi.forbidden(),
  }),
  comments: Joi.string().trim().allow(null).optional(),
  prioritydd: Joi.any().forbidden(),
  commentsdd: Joi.any().forbidden(),
});

// POST /api/decisions
router.post('/', async (req, res) => {
  try {
    console.log('Handling POST /api/decisions:', {
      requestId: req.body.requestId,
      status: req.body.status,
      priority: req.body.priority,
      comments: req.body.comments,
      prioritydd: req.body.prioritydd,
      commentsdd: req.body.commentsdd,
    });

    // Determine schema based on fields
    let schema;
    let isDeputyDirector = false;
    if ('prioritydd' in req.body || 'commentsdd' in req.body) {
      schema = deputyDirectorSchema;
      isDeputyDirector = true;
    } else if ('priority' in req.body || 'comments' in req.body) {
      schema = directorGeneralSchema;
    } else {
      return res.status(400).json({ error: 'Invalid decision data: Missing or invalid fields' });
    }

    const { error } = schema.validate(req.body);
    if (error) {
      console.log('Validation failed:', error.details);
      return res.status(400).json({ error: 'Invalid decision data', details: error.details });
    }

    const { requestId, status, priority, comments, prioritydd, commentsdd } = req.body;

    // Verify request exists
    const request = await Request.findOne({ requestId }).lean();
    if (!request) {
      console.log('Request not found:', requestId);
      return res.status(404).json({ error: 'Request not found' });
    }

    // Check if decision exists
    const existingDecision = await Decision.findOne({ requestId });
    if (existingDecision) {
      console.log('Updating existing decision:', requestId, existingDecision._id);

      // Update only status
      const updatedDecision = await Decision.updateOne(
        { requestId },
        {
          $set: {
            status,
            commentsdd,
            prioritydd,
            updatedAt: Date.now(),
          },
        }
      );

      if (updatedDecision.matchedCount === 0) {
        console.log('Failed to update decision:', requestId);
        return res.status(500).json({ error: 'Decision update failed' });
      }

      // Update Request status
      const updatedRequest = await Request.updateOne(
        { requestId },
        {
          $set: {
            status,
            updatedAt: Date.now(),
          },
        }
      );

      if (updatedRequest.matchedCount === 0) {
        console.log('Failed to update request:', requestId);
        return res.status(500).json({ error: 'Request update failed' });
      }

      console.log('Decision and request updated:', requestId, { status });
      return res.status(200).json({ message: 'Decision updated successfully', decisionId: existingDecision._id });
    }

    // Create new decision
    const decisionData = {
      requestId,
      status,
      prioritydd,
      commentsdd,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    if (isDeputyDirector) {
      decisionData.prioritydd = prioritydd || null;
      decisionData.commentsdd = commentsdd || null;
    } else {
      decisionData.priority = priority || null;
      decisionData.comments = comments || null;
    }

    const newDecision = new Decision(decisionData);
    const savedDecision = await newDecision.save();
    console.log('Decision saved:', savedDecision._id);

    // Update Request document
    const requestUpdate = {
      status,
      prioritydd,
      commentsdd,
      updatedAt: Date.now(),
    };

    if (isDeputyDirector) {
      requestUpdate.prioritydd = prioritydd || null;
      requestUpdate.commentsdd = commentsdd || null;
    } else {
      requestUpdate.priority = priority || null;
      requestUpdate.comments = comments || null;
    }

    const updatedRequest = await Request.updateOne(
      { requestId },
      { $set: requestUpdate }
    );

    if (updatedRequest.matchedCount === 0) {
      console.log('Failed to update request:', requestId);
      return res.status(500).json({ error: 'Request update failed' });
    }

    console.log('Request status updated:', requestId, requestUpdate);
    return res.status(201).json({ message: 'Decision submitted successfully', decisionId: savedDecision._id });
  } catch (error) {
    console.error('POST /api/decisions error:', error.message, error.stack);
    return res.status(500).json({ error: 'Server error submitting decision', details: error.message });
  }
});

// GET /api/decisions/:requestId
router.get('/:requestId', async (req, res) => {
  try {
    const decodedId = decodeURIComponent(req.params.requestId).replace(/%2F/g, '/');
    console.log(`GET /api/decisions/${decodedId}`);

    // Fetch Request document
    const request = await Request.findOne({ requestId: decodedId }).lean();
    if (!request) {
      console.log('Request not found:', decodedId);
      return res.status(404).json({ error: 'Request not found' });
    }

    // Fetch Decision document
    const decision = await Decision.findOne({ requestId: decodedId }).lean();

    // Combine data
    const response = {
      requestId: decodedId,
      status: decision ? decision.status : request.status,
      priority: decision ? decision.priority : null,
      comments: decision ? decision.comments : null,
      prioritydd: decision ? decision.prioritydd : null,
      commentsdd: decision ? decision.commentsdd : null,
    };

    if (!decision) {
      console.log('Decision not found:', decodedId);
      return res.status(400).json({ error: 'Decision not found' });
    }

    console.log('Fetched decision:', decodedId);
    return res.status(200).json(response);
  } catch (error) {
    console.error(`GET /api/decisions/${req.params.requestId} error:`, error.message, error.stack);
    return res.status(500).json({ error: 'Server error fetching decision' });
  }
});

export default router;