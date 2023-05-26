module.exports = function () {
    return {
        not_autorized: (lang) => { if (lang === 'es') { return 'No autorizado.' } else { return 'Not autorized.' } },
        user_not_found: (lang) => { if (lang === 'es') { return 'Usuario no encontrado.' } else { return 'User not found.' } },
        wrong_user_pass: (lang) => { if (lang === 'es') { return 'Usuario o contraseña incorrecta.' } else { return 'Wrong user or password.' } },
        unknown_error: (lang) => { if (lang === 'es') { return 'Error desconocido.' } else { return 'Unknown error.' } },
        unknown_company: (lang) => { if (lang === 'es') { return 'Compañia desconocido(a).' } else { return 'Unknown company.' } },
        unknown_identity: (lang) => { if (lang === 'es') { return 'Identidad desconocido(a).' } else { return 'Unknown identity.' } },
        success_registration: (lang) => { if (lang === 'es') { return 'Registrado exitosamente.' } else { return 'Successful registration.' } },
        fail_registration: (lang) => { if (lang === 'es') { return 'Registro fallido.' } else { return 'Fail registration.' } },
        success_edit: (lang) => { if (lang === 'es') { return 'Editado exitosamente.' } else { return 'Successful edit.' } },
        fail_edit: (lang) => { if (lang === 'es') { return 'Editado falló.' } else { return 'Fail edit.' } },
        success_list: (lang) => { if (lang === 'es') { return 'Listado exitosamente.' } else { return 'Successful listed.' } },
        fail_list: (lang) => { if (lang === 'es') { return 'Listado falló.' } else { return 'Fail listed.' } },
        success_deletion: (lang) => { if (lang === 'es') { return 'Eliminado exitosamente.' } else { return 'Successful deleted.' } },
        fail_deletion: (lang) => { if (lang === 'es') { return 'Eliminación falló.' } else { return 'Fail deletion.' } },
        invalid_token: (lang) => { if (lang === 'es') { return 'Token invalido.' } else { return 'Invalid token.' } },
        error: (lang) => { if (lang === 'es') { return 'Hubo un error.' } else { return 'There was an error.' } }
    }
}