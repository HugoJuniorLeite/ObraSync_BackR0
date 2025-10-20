import prisma from "../database/prismaClient.js";


async function create_employee(data) {
    console.log(data.registration_token, "repository");
    
  return prisma.employee.create({
    data: {
      name: data.name,
      date_of_birth: new Date(data.date_of_birth),
      rg: data.rg,
      cpf: data.cpf,
      drivers_license: data.drivers_license,
      occupation_id: data.occupation_id,
      admission_date: data.admission_date,
      password_hash: data.registration_token,
      
      phones: {
        create :{

          phoneNumber: data.phones.create.phoneNumber 
        }
        },
      address: {
        create: {

          zip_code: data.address.create.zip_code,
          street_name:data.address.create.street_name,
          number_of_house:Number(data.address.create.number_of_house),
          neighborhood: data.address.create.neighborhood,
          city:data.address.create.city ,
          state: data.address.create.state,
          country: data.address.create.country
        }
     },
     project_team: {
  create: [
    {
      project_id: Number(data.project_team.create.project_id),
      active: true
    }
  ]
}
    },
  });
}

async function get_all_employees(params) {
  try {
    return prisma.employee.findMany({
      
include: {
  project_team: {
    include: {
      project: true, // pega os dados do projeto
    },
  },
  occupation: true, // pega cargo/função
  address: true,    // pega endereço
  phones: true,     // pega telefones
  cnhs: true,       // pega CNHs
},
       orderBy: {
          name: "asc", // 🔤 ordena alfabeticamente A → Z
      }
    })
  } catch (error) {
    throw new Error(error.message);
    
  }
}

async function employee_project(employee_id) {
  try {
    return prisma.project_team.findFirst({
      where:{
        employee_id:Number(employee_id)
      }
      });
  } catch (error) {
    throw new Error(error.message);
    }
}
async function create_cnh(employee_id, data) {
  console.log(employee_id, data, "repository");
  
  return prisma.cnh.create({
    data: {
    employee_id:Number(employee_id),
    category_cnh: data.create.category_cnh,
    number_license: data.create.number_license,
    validity: new Date(data.create.validity),
    first_drivers_license: data.create.first_drivers_license,
    }
  })
}

async function find_employee(cpf) {
  return prisma.employee.findUnique({
    where: { cpf }
  });
}

async function find_employee_by_id(employee_id) {
  return prisma.employee.findUnique({
    where: { id: Number(employee_id) }
  });
}

async function find_employee_by_project(project_id) {
  try {
    return prisma.project_team.findMany({
where: {project_id: Number(project_id), active: true}, 
 include: {
    project: true,
    employee: {
      include: {
        occupation: true, // cargo/função
        address: true,    // endereço
        phones: true,     // telefones
        cnhs: true,       // CNHs, se existir
      },
    },
  },
            orderBy: {
        employee: {
          name: "asc", // 🔤 ordena alfabeticamente A → Z
        },
      },
    })
  } catch (error) {
    throw new Error(error.message);
    
  }
}
  
//   async function updateEmployeeWithRelations(employee_id, data) {
//   console.log(data, "repository");
//   const existingPhones = await prisma.phone.findMany({
//   where: { employee_id: Number(employee_id) }
// });
// console.log("Phones encontrados:", existingPhones);

//   return prisma.employee.update({
//     where: { id: Number(employee_id) },
//     data: {
//       name: data.name ?? undefined,
//       date_of_birth: data.date_of_birth ? new Date(data.date_of_birth) : undefined,
//       rg: data.rg ?? undefined,
//       cpf: data.cpf ?? undefined,
//       drivers_license: data.drivers_license ?? undefined,
//       occupation_id: data.occupation_id ?? undefined,
//       admission_date: data.admission_date ? new Date(data.admission_date) : undefined,

//       phones: data.phones?.create
//         ? {
//             updateMany: {
//               where: { employee_id: Number(employee_id) },
//               data: {
//                 phoneNumber: data.phones.create.phoneNumber
//               }
//             }
//           }
//         : undefined,

//       cnhs: data.cnhs?.create
//         ? {
//             updateMany: {
//               where: { employee_id:Number(employee_id) },
//               data: {
//                 category_cnh: data.cnhs.create.category_cnh,
//                 number_license: data.cnhs.create.number_license,
//                 validity: new Date(data.cnhs.create.validity),
//                 first_drivers_license: new Date(data.cnhs.create.first_drivers_license)
//               }
//             }
//           }
//         : undefined,

//       address: data.address?.create
//         ? {
//             update: {
//               zip_code: data.address.create.zip_code,
//               street_name: data.address.create.street_name,
//               number_of_house: data.address.create.number_of_house,
//               neighborhood: data.address.create.neighborhood,
//               city: data.address.create.city,
//               state: data.address.create.state,
//               country: data.address.create.country
//             }
//           }
//         : undefined,

//       project_team: data.project_team?.create
//         ? {
//             updateMany: {
//               where: { employee_id:Number(employee_id) },
//               data: {
//                 project_id: data.project_team.create.project_id,
//                 active: data.project_team.create.active
//               }
//             }
//           }
//         : undefined
//     }
//   });
// }

async function updateEmployeeWithRelations(employee_id, data) {
  console.log(data.cnh.create, "repository");
try {
  
  // 🔹 Atualiza os dados principais do funcionário
  const updatedEmployee = await prisma.employee.update({
    where: { id: Number(employee_id) },
    data: {
      name: data.name ?? undefined,
      date_of_birth: data.date_of_birth ? new Date(data.date_of_birth) : undefined,
      rg: data.rg ?? undefined,
      cpf: data.cpf ?? undefined,
      drivers_license: data.drivers_license ?? undefined,
      occupation_id: data.occupation_id ?? undefined,
      admission_date: data.admission_date ? new Date(data.admission_date) : undefined,
    },
  });

  // 🔹 Atualiza ou cria telefone
  if (data.phones?.create?.phoneNumber) {
    const existingPhone = await prisma.phone.findFirst({
      where: { employee_id: Number(employee_id) },
    });

    if (existingPhone) {
      await prisma.phone.update({
        where: { id: existingPhone.id },
        data: { phoneNumber: data.phones.create.phoneNumber },
      });
    } else {
      await prisma.phone.create({
        data: {
          employee_id: Number(employee_id),
          phoneNumber: data.phones.create.phoneNumber,
        },
      });
    }
  }
  
  // 🔹 Atualiza ou cria endereço
  if (data.address?.create) {
    const existingAddress = await prisma.address.findFirst({
      where: { employee_id: Number(employee_id) },
    });

    if (existingAddress) {
      await prisma.address.update({
        where: { id: existingAddress.id },
        data: {
          zip_code: data.address.create.zip_code,
          street_name: data.address.create.street_name,
          number_of_house: Number(data.address.create.number_of_house),
          neighborhood: data.address.create.neighborhood,
          city: data.address.create.city,
          state: data.address.create.state,
          country: data.address.create.country,
        },
      });
    } else {
      await prisma.address.create({
        data: {
          employee_id: Number(employee_id),
          ...data.address.create,
        },
      });
    }
  }
  
  // // 🔹 Atualiza CNH (se existir)
  // if (data.cnhs?.create) {
  //   const existingCnh = await prisma.cnh.findFirst({
  //     where: { employee_id: Number(employee_id) },
  //   });

  //   if (existingCnh) {
  //     await prisma.cnh.update({
  //       where: { id: existingCnh.id },
  //       data: {
  //         category_cnh: data.cnhs.create.category_cnh,
  //         number_license: data.cnhs.create.number_license,
  //         validity: new Date(data.cnhs.create.validity),
  //         first_drivers_license: new Date(data.cnhs.create.first_drivers_license),
  //       },
  //     });
  //   } else {
  //     await prisma.cnh.create({
  //       data: {
  //         employee_id: Number(employee_id),
  //         category_cnh: data.cnhs.create.category_cnh,
  //         number_license: data.cnhs.create.number_license,
  //         validity: new Date(data.cnhs.create.validity),
  //         first_drivers_license: new Date(data.cnhs.create.first_drivers_license),
          
  //       },
  //     });
  //   }
  // }

  // 🔹 Atualiza ou cria CNH
if (data.cnh?.create && Array.isArray(data.cnh.create) && data.cnh.create.length > 0) {
  const cnhData = data.cnh.create[0]; // considerando apenas 1 CNH por funcionário

  const existingCnh = await prisma.cnh.findFirst({
    where: { employee_id: Number(employee_id) },
  });

  if (existingCnh) {
    await prisma.cnh.update({
      where: { id: existingCnh.id },
      data: {
        category_cnh: cnhData.category_cnh,
        number_license: cnhData.number_license,
        validity: new Date(cnhData.validity),
        first_drivers_license: new Date(cnhData.first_drivers_license),
      },
    });
  } else {
    await prisma.cnh.create({
      data: {
        employee_id: Number(employee_id),
        category_cnh: cnhData.category_cnh,
        number_license: cnhData.number_license,
        validity: new Date(cnhData.validity),
        first_drivers_license: new Date(cnhData.first_drivers_license),
      },
    });
  }
}
  
  // 🔹 Atualiza o projeto vinculado
  if (data.project_team?.create?.project_id) {
    const existingTeam = await prisma.project_team.findFirst({
      where: { employee_id: Number(employee_id) },
    });

    if (existingTeam) {
      await prisma.project_team.update({
        where: { id: existingTeam.id },
        data: {
          project_id: Number(data.project_team.create.project_id),
          active: data.project_team.create.active,
        },
      });
    } else {
      await prisma.project_team.create({
        data: {
          employee_id: Number(employee_id),
          project_id: Number(data.project_team.create.project_id),
          active: true,
        },
      });
    }
  }
  
  // 🔹 Retorna o funcionário atualizado com os relacionamentos
  return prisma.employee.findUnique({
    where: { id: Number(employee_id) },
    include: {
      phones: true,
      address: true,
      cnhs: true,
      occupation: true,
      project_team: true,
    },
  });
} 
catch (error) {
  throw new Error(error);
  
}
}



async function deactivate_employee(employee_id) {
 try {
   await prisma.$transaction([
  prisma.employee.update({
    where: { id: Number(employee_id) },
    data: { active: false }
  }),

  prisma.phone.updateMany({
    where: { employee_id: Number(employee_id) },
    data: { active: false }
  }),

  prisma.cnh.updateMany({
    where: { employee_id: Number(employee_id) },
    data: { active: false }
  }),

  prisma.address.updateMany({
    where: { employee_id: Number(employee_id) },
    data: { active: false }
  }),

//   prisma.project_team.updateMany({
//     where: { employee_id: Number(employee_id) },
//     data: { active: false }
//   })
 ]);
 } catch (error) {
  throw new Error(error.message);
  
 }
}

const employee_repository = {
    get_all_employees ,employee_project,create_employee, create_cnh, find_employee_by_id,find_employee, deactivate_employee, updateEmployeeWithRelations,find_employee_by_project
};

export default employee_repository;