// src/b.services/adminAttendances_service.js

import adminAttendancesRepository from "../c.repositories/adminAttendances_repository.js";

class AdminAttendancesService {
  async execute(filters) {
    const attendances =
      await adminAttendancesRepository.findAttendances(filters);

    return attendances.map((item) => {
      const start = item.created_at;
      const end = item.finished_at;

      const journeyMinutes =
        start && end ? Math.floor((end - start) / 60000) : 0;

      return {
        date: start,
        technician: item.technician?.name,
        technician_id: item.technician?.id,

        os_number: item.service_order?.os_number,
        invoice_number: item.service_order?.invoice_number,
        client: item.service_order?.client_name,
        project: item.service_order?.project_name,
        address: item.service_order?.address,

        start_time: start,
        end_time: end,
        journey_minutes: journeyMinutes,
        distance_km: item.distance_km || 0,

        status: end ? "FINALIZADO" : "EM ANDAMENTO",
      };
    });
  }
}

export default new AdminAttendancesService();
