const init = () => {
  document.getElementById("button-send").addEventListener("click", submitForm);
};

const submitForm = (e) => {
  e.preventDefault();

  const data = accessData();
  console.log(data);
  const url = "http://localhost:3030/users";

  if (!data) {
    return;
  }

  fetch(`${url}/`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
  })
    .then((response) => {
      return alert("Cadastro realizado com sucesso");
    })
    .catch((e) => {
      return console.error(e);
    });
};

const accessData = () => {
  return {
    name: document.getElementById("input-first").value,
    password: document.getElementById("input-password").value,
    email: document.getElementById("input-email").value,
  };
};

init();

// EXEMPLO DE GET ALL
// const getAll =  () => {
//      fetch("http://localhost:3030/users/")
//         .then((response) => {
//             return response.json()
//             .then((data) => {
//                 return console.log(data)
//             })
//         })
//         .catch((e) => {
//             return console.error(e)
//         })
// }