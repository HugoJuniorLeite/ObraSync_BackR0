// src/a.controllers/adminAttendances_controller.js

import adminAttendances_service from "../b.services/adminAttendances_service";

// import adminAttendancesService from "../b.services/adminAttendances_service.js";

class AdminAttendancesController {
  async index(request, response) {
    const { technician_id, date_start, date_end } = request.query;

    const attendances = await adminAttendances_service.execute({
      technician_id,
      date_start,
      date_end,
    });

    return response.json(attendances);
  }
}

export default new AdminAttendancesController();
