import repo from "../c.repositories/mobile_journey_repository.js";

// ------------------------------------------------------------
// INICIAR JORNADA
// ------------------------------------------------------------
async function start_journey_service(data) {
  if (!data.employee_id || !data.date) {
    throw new Error("employee_id e date são obrigatórios.");
  }

  return repo.start_journey_repository({
    date: data.date,
    employee_id: data.employee_id,
    inicio_expediente: data.inicio_expediente,
    gps_inicio: data.gps_inicio,
  });
}


// ------------------------------------------------------------
// INICIAR DESLOCAMENTO
// ------------------------------------------------------------
async function create_attendance_service(journeyId, data) {
  if (!journeyId) throw new Error("journey_id é obrigatório");
  if (!data.tipo) throw new Error("tipo é obrigatório");

  return mobile_journey_repository.create_attendance_repository(
    journeyId,
    data
  );
}


// ------------------------------------------------------------
// INICIAR ATENDIMENTO
// ------------------------------------------------------------
async function start_service_service(attendanceId, data) {
  if (!attendanceId) {
    throw new Error("attendanceId é obrigatório");
  }

  console.log("SERVICE:", attendanceId, data);

  // 👉 Service NÃO renomeia payload sem necessidade
  return repo.start_service_repository(attendanceId, data);
}



// ------------------------------------------------------------
// FINALIZAR JORNADA
// ------------------------------------------------------------
async function finish_journey_service(id, data) {
  return repo.finish_journey_repository(id, {
    fim_expediente: data.fim_expediente,
    gps_fim: data.gps_fim,
    assinatura: data.assinatura,
  });
}

// ------------------------------------------------------------
// ATENDIMENTO
// ------------------------------------------------------------
async function add_attendance_service(journey_id, att) {
  return repo.add_attendance_repository(journey_id, att);
}

async function add_route_point_service(attendance_id, point) {
  return repo.add_route_point_repository(attendance_id, point);
}

// ------------------------------------------------------------
// ALMOÇO
// ------------------------------------------------------------
async function add_lunch_service(journey_id, lunch) {
  return repo.add_lunch_repository(journey_id, lunch);
}

// ------------------------------------------------------------
// BASE LOG
// ------------------------------------------------------------
async function add_base_log_service(journey_id, log) {
  return repo.add_base_log_repository(journey_id, log);
}

// ------------------------------------------------------------
// LISTAR / BUSCAR
// ------------------------------------------------------------
async function list_journeys_service(filters) {
  return repo.list_journeys_repository(filters);
}

async function get_journey_by_id_service(id) {
  const journey = await repo.get_journey_by_id_repository(id);
  if (!journey) throw new Error("Jornada não encontrada");
  return journey;
}

export default {
  start_journey_service,
  create_attendance_service,
  start_service_service,
  finish_journey_service,
  add_attendance_service,
  add_route_point_service,
  add_lunch_service,
  add_base_log_service,
  list_journeys_service,
  get_journey_by_id_service,
};
