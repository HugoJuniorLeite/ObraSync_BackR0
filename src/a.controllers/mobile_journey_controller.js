import service from "../b.services/mobile_journey_service.js";

// ------------------------------------------------------------
// INICIAR JORNADA
// ------------------------------------------------------------
async function start_journey(req, res) {
  try {
    console.log(req.body, "COntroller")
    const created = await service.start_journey_service(req.body);
    return res.status(201).json(created);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
}

// ------------------------------------------------------------
// FIM DA JORNADA
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
// INICIAR DESLOCAMENTO → CRIAR ATENDIMENTO (STEP 4)
// ------------------------------------------------------------
async function create_attendance(req, res) {
console.log("CREATE ATTENDANCE", req.body)
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
// FINALIZAR ATENDIMENTO
// ------------------------------------------------------------

async function finish_service(req, res) {
  try {
    const { attendance_id } = req.params;
console.log("FOTOS RECEBIDAS:", req.body.fotos?.length);

    const updated = await service.finish_service_service(
      Number(attendance_id),
      req.body
    );

    return res.status(200).json(updated);
  } catch (error) {
    console.error("Erro ao finalizar atendimento:", error);
    return res.status(400).json({ message: error.message });
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
//-----------------------------------------------
// Update
//-----------------------------------------------

// async function update_attendance_os(req, res) {
//   try {
//     const { attendance_id } = req.params;
//     const { tipo, ordem_tipo, ordem_numero } = req.body;

//     const updated = await service.update_attendance_os_service({
//       attendance_id: Number(attendance_id),
//       user_id: req.user.id,
//       tipo,
//       ordem_tipo,
//       ordem_numero,
//     });

//     return res.json(updated);
//   } catch (e) {
//     return res.status(400).json({ message: e.message });
//   }
// }

async function update_attendance_os(req, res) {

  try {
    const attendanceId = Number(req.params.attendance_id);
    const userId = Number(req.user.id);
console.log("CONTROLER", attendanceId,  userId)
    const updated = await service.update_attendance_os_service(
      attendanceId,
      userId,
      req.body
    );

    return res.json(updated);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
}


// ------------------------------------------------------------
// INICIA ALMOÇO
// ------------------------------------------------------------
async function add_lunch(req, res) {
    console.log(req.params, "ADD_LUNCH")

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
// FINALIZA ALMOÇO
// ------------------------------------------------------------

async function finish_lunch(req, res) {
    console.log(req.params, "FINISH")

  try {
    const { lunch_id } = req.params;
    const updated = await service.finish_lunch_service(Number(lunch_id), req.body);
    res.json(updated);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
}

// ------------------------------------------------------------
// SUSPENDE ALMOÇO
// ------------------------------------------------------------
async function suspend_lunch(req, res) {
  console.log(req.params, "SUSPEND_LUNCH")
  try {
    const { lunch_id } = req.params;
    const updated = await service.suspend_lunch_service(Number(lunch_id), req.body);
    res.json(updated);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
}



// ------------------------------------------------------------
// BASE LOG
// ------------------------------------------------------------
// async function add_base_log(req, res) {
//   console.log("CONTROLLER LOG",   req.params.journey_id, res.body)
//   try {
//     const { journey_id } = req.params;

//       console.log("CONTROLLER LOG",   journey_id, res.body)

//     const created = await service.add_base_log_service(
//       Number(journey_id),
//       req.body
//     );
//     return res.status(201).json(created);
//   } catch (e) {
//     return res.status(400).json({ message: e.message });
//   }
// }


async function add_base_log(req, res) {
  console.log("CONTROLLER LOG", req.params, req.body);

  try {
    const { journey_id } = req.params;

    const created = await service.add_base_log_service(
      Number(journey_id),
      req.body
    );

    return res.status(201).json(created);
  } catch (e) {
    console.error("Erro add_base_log:", e);
    return res.status(400).json({ message: e.message });
  }
}

// ------------------------------------------------------------
// LISTAR / GET
// ------------------------------------------------------------
// async function list_journeys(req, res) {
//   try {
//     console.log("entrou list_journeys", req.query)
//     const journeys = await service.list_journeys_service(req.query);
//     return res.status(200).json(journeys);
//   } catch (e) {
//     return res.status(400).json({ message: e.message });
//   }
// }

async function list_journeys(req, res) {
  try {
    const journeys = await service.list_journeys_service({
      employee_id: req.user.id,   // 🔥 vem do token
      date: req.query.date,       // opcional
    });

    return res.status(200).json(journeys);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
}


async function get_journey_by_id(req, res) {
  try {
        console.log("entrou list_journeys_by_id")

    const { id } = req.params;
    const journey = await service.get_journey_by_id_service(id);
    return res.status(200).json(journey);
  } catch (e) {
    return res.status(404).json({ message: e.message });
  }
}



async function get_active_journey_full(req, res) {
  try {
    const employeeId = req.user.employee_id;

    const journey = await service.getActiveJourneyFull(employeeId);

    if (!journey) {
      return res.status(204).send();
    }

    return res.json(journey);
  } catch (err) {
    console.error("❌ Controller get_active_journey_full:", err);
    return res.status(500).json({
      message: "Erro ao buscar jornada ativa",
    });
  }
}




export default {
  start_journey,
  create_attendance,
  start_service,
  finish_service,
  add_attendance,
  add_route_point,
  update_attendance_os,
  add_lunch,
  finish_lunch,
  suspend_lunch,
  add_base_log,
  list_journeys,
  get_journey_by_id,
  finish_journey,
get_active_journey_full,
};
