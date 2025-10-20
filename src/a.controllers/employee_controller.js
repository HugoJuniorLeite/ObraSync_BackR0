import employee_service from "../b.services/employee_service.js";

async function register_employee_controller(req, res) {
    const data = req.body
    console.log(data, "controller");

    try {
        if (!data || data === undefined) {
        }
        await employee_service.register_employee(data)
        res.status(201).json({ message: "Cadastro criado com sucesso!" })
    } catch (error) {
        console.log(error);

        return res.status(error.status || 400).json({ message: error.message })
    }

}

async function find_employee_by_project_controller(req, res) {
    const project_id = req.params.project_id;
    try {
        if (!project_id || project_id === undefined) {
            return res.status(error.status || 400).json({ message: error.message })
        }
        const employee_by_project = await employee_service.find_employee_by_project_service(project_id);
        console.log(employee_by_project, "project");
        
        const result = employee_by_project.map((emp) => (

            {
                 project: emp.project,
                id: emp.employee.id,
                name: emp.employee.name,
                date_of_birth: emp.employee.date_of_birth,
                rg: emp.employee.rg,
                cpf: emp.employee.cpf,
                drivers_license: emp.employee.drivers_license,
                admission_date: emp.employee.admission_date,
                active: emp.employee.active,
                occupation_id: emp.occupation_id,
                occupation_name: emp.employee.occupation.name,
                occupation_description: emp.employee.occupation.description_of_occupation,
                dangerousness: emp.employee.occupation.dangerousness,
                salary: emp.employee.occupation.total_salary,
                zip_code: emp.employee.address.zip_code,
                street_name: emp.employee.address.street_name,
                number_of_house: emp.employee.address.number_of_house,
                city: emp.employee.address.city,
                state: emp.employee.address.state,
                neighborhood: emp.employee.address.neighborhood,
                phones: emp.employee.phones
            }

        )

        )


        console.log(result, "employee");

        res.status(200).send(result)
    } catch (error) {
        return res.status(error.status || 400).json({ message: error.message })
    }
}

async function get_all_employees_controller(req, res) {

    try {
        const all_employees = await employee_service.get_all_employees_service();
        console.log(all_employees.project_team, "all_employees");


            
        const result = all_employees.map((emp) => (

            {
                project: emp.project_team,
                id: emp.id,
                name: emp.name,
                date_of_birth: emp.date_of_birth,
                rg: emp.rg,
                cpf: emp.cpf,
                drivers_license: emp.drivers_license,
                admission_date: emp.admission_date,
                active: emp.active,
                occupation_id: emp.occupation_id,
                occupation_name: emp.occupation.name,
                occupation_description: emp.occupation.description_of_occupation,
                dangerousness: emp.occupation.dangerousness,
                salary: emp.occupation.total_salary,
                zip_code: emp.address.zip_code,
                street_name: emp.address.street_name,
                number_of_house: emp.address.number_of_house,
                city: emp.address.city,
                state: emp.address.state,
                neighborhood: emp.address.neighborhood,
                phones: emp.phones,
                cnh: emp.cnhs
            }

        )

        )
        console.log(all_employees.length, "employee", result.length, "result")
        res.status(200).send(result);
    } catch (error) {
        return res.status(error.status || 400).json({ message: error.message })
    }
}

async function update_employee_controller(req, res) {
    const data = req.body;
    const employee_id = req.params.employee_id;
    try {
        if (!data || !employee_id || data === undefined || employee_id === undefined) {
            return res.status(error.status || 400).json({ message: error.message })
        }
        await employee_service.update_employee(employee_id, data);
        res.status(200).send("Dados atualizados com sucesso")
    } catch (error) {
        return res.status(error.status || 400).json({ message: error.message })
    }
}

async function delete_employee(req, res) {
    const employee_id = req.params.employee_id;
    try {
        if (!employee_id || employee_id === undefined) {
            return res.status(error.status || 400).json({ message: error.message })
        }
        await employee_service.delete_employee(employee_id)
        res.status(200).send("Dados atualizados com sucesso")
    } catch (error) {
        return res.status(error.status || 400).json({ message: error.message })
    }
}

const employee_controller = {
    register_employee_controller, delete_employee, find_employee_by_project_controller, update_employee_controller, get_all_employees_controller
}
export default employee_controller;