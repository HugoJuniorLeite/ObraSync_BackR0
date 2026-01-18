// // src/a.controllers/adminAttendances_controller.js


// import adminAttendances_service from "../b.services/adminAttendances_service";

// // import adminAttendancesService from "../b.services/adminAttendances_service.js";

// class AdminAttendancesController {
//   async index(request, response) {
//     const { technician_id, date_start, date_end } = request.query;

//     const attendances = await adminAttendances_service.execute({
//       technician_id,
//       date_start,
//       date_end,
//     });

//     return response.json(attendances);
//   }
// }

// export default new AdminAttendancesController();


// import admin_attendances_service from "../b.services/admin_attendances_service.js";
import admin_attendances_service from "../b.services/admin_attendances_service";

async function create_admin_attendance_controller(req, res) {
    const data = req.body;
    console.log(data, "controller_admin_attendance");

    if (!data) {
        return res.status(400).json({ message: "Obrigatório informar dados válidos" });
    }

    try {
        await admin_attendances_service.create_admin_attendance_service(data);
        res.status(201).send("Atendimento administrativo criado com sucesso!");
    } catch (error) {
        return res.status(error.status || 400).json({ message: error.message });
    }
}

async function get_all_admin_attendances_controller(req, res) {
    try {
        const attendances =
            await admin_attendances_service.get_all_admin_attendances_service();
        res.status(200).send(attendances);
    } catch (error) {
        return res.status(error.status || 400).json({ message: error.message });
    }
}

async function get_admin_attendance_by_id_controller(req, res) {
    const { attendance_id } = req.params;

    if (!attendance_id) {
        return res.status(400).json({ message: "ID inválido" });
    }

    try {
        const attendance =
            await admin_attendances_service.get_admin_attendance_by_id_service(attendance_id);
        res.status(200).send(attendance);
    } catch (error) {
        return res.status(error.status || 400).json({ message: error.message });
    }
}

async function change_admin_attendance_status_controller(req, res) {
    const { attendance_id } = req.params;
    const { status } = req.body;

    if (!attendance_id || !status) {
        return res.status(400).json({ message: "Dados inválidos" });
    }

    try {
        await admin_attendances_service.change_admin_attendance_status_service(
            attendance_id,
            status
        );
        res.status(200).send("Status atualizado com sucesso!");
    } catch (error) {
        return res.status(error.status || 400).json({ message: error.message });
    }
}

const admin_attendances_controller = {
    create_admin_attendance_controller,
    get_all_admin_attendances_controller,
    get_admin_attendance_by_id_controller,
    change_admin_attendance_status_controller
};

export default admin_attendances_controller;
