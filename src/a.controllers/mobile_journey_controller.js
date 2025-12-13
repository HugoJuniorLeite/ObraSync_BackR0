import service from "../b.services/mobile_journey_service.js";

// ------------------------------------------------------------
// INICIAR JORNADA
// ------------------------------------------------------------
async function start_journey(req, res) {
  try {
    const created = await service.start_journey_service(req.body);
    return res.status(201).json(created);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
}

// ------------------------------------------------------------
// INICIAR DESLOCAMENTO → CRIAR ATENDIMENTO (STEP 4)
// ------------------------------------------------------------
async function create_attendance(req, res) {
  try {
    const { journey_id } = req.params;

    const created = await service.create_attendance_service(
      Number(journey_id),
      req.body
    );

    return res.status(201).json(created);
  } catch (error) {
    console.error("Erro ao criar atendimento:", error);
    return res.status(400).json({ message: error.message });
  }
}


// ------------------------------------------------------------
// INICIAR ATENDIMENTO
// ------------------------------------------------------------

// async function start_service(req, res) {
//   try {
//     const { attendance_id } = req.params;

//     const updated = await service.start_service_service(
//       Number(attendance_id),
//       req.body
//     );

//     return res.status(200).json(updated);
//   } catch (error) {
//     console.error("Erro ao iniciar atendimento:", error);
//     return res.status(400).json({ message: error.message });
//   }
// }

async function start_service(req, res) {
  try {
    const { attendance_id } = req.params;
console.log("START SERVICE:", attendance_id, req.body);

    const updated = await service.start_service_service(
      Number(attendance_id),
      req.body
    );

    return res.status(200).json(updated);
  } catch (error) {
    console.error("Erro ao iniciar atendimento:", error);
    return res.status(400).json({ message: error.message });
  }
}


// ------------------------------------------------------------
// FINALIZAR
// ------------------------------------------------------------
async function finish_journey(req, res) {
  try {
    const { id } = req.params;
    const updated = await service.finish_journey_service(Number(id), req.body);
    return res.status(200).json(updated);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
}

// ------------------------------------------------------------
// ATENDIMENTO
// ------------------------------------------------------------
async function add_attendance(req, res) {
  try {
    const { journey_id } = req.params;
    const created = await service.add_attendance_service(
      Number(journey_id),
      req.body
    );
    return res.status(201).json(created);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
}

async function add_route_point(req, res) {
  try {
    const { attendance_id } = req.params;
    const created = await service.add_route_point_service(
      Number(attendance_id),
      req.body
    );
    return res.status(201).json(created);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
}

// ------------------------------------------------------------
// ALMOÇO
// ------------------------------------------------------------
async function add_lunch(req, res) {
  try {
    const { journey_id } = req.params;
    const created = await service.add_lunch_service(
      Number(journey_id),
      req.body
    );
    return res.status(201).json(created);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
}

// ------------------------------------------------------------
// BASE LOG
// ------------------------------------------------------------
async function add_base_log(req, res) {
  try {
    const { journey_id } = req.params;
    const created = await service.add_base_log_service(
      Number(journey_id),
      req.body
    );
    return res.status(201).json(created);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
}

// ------------------------------------------------------------
// LISTAR / GET
// ------------------------------------------------------------
async function list_journeys(req, res) {
  try {
    const journeys = await service.list_journeys_service(req.query);
    return res.status(200).json(journeys);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
}

async function get_journey_by_id(req, res) {
  try {
    const { id } = req.params;
    const journey = await service.get_journey_by_id_service(id);
    return res.status(200).json(journey);
  } catch (e) {
    return res.status(404).json({ message: e.message });
  }
}



export default {
  start_journey,
  create_attendance,
  start_service,
  finish_journey,
  add_attendance,
  add_route_point,
  add_lunch,
  add_base_log,
  list_journeys,
  get_journey_by_id,
};
