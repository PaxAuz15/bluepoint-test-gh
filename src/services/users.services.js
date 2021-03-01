export function getUsers() {
    const url = `https://app.crmetric.com/srv-crmetric-web/rest/usuario/listarUsuarioxnombre`;

    const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body:{
          "name":"mar"
        }
      };

    return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      return err;
    });
}

export function updateUser(data) {
    const url = `https://app.crmetric.com/srv-crmetric-web/rest/usuario/registrarUsuario`;
  
    const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };

    return fetch(url, params)
    .then((response) => {
      if ((response.status >= 200) & (response.status < 300)) {
        return response.json();
      }
      return {
        code: 404,
        message: "Ocurrio un error al guardar los datos",
      };
    })
    .catch((err) => {
      return err;
    });
}