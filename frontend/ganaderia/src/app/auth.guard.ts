import { CanActivateFn } from '@angular/router';
import { AuthService } from './services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  // const token = this.authService.getToken();

    // if (token) {
    //   // Si hay un token, verifica su validez (por ejemplo, si no está expirado)
    //   const isTokenValid = this.authService.isTokenValid(token);

    //   if (isTokenValid) {
    //     // Si el token es válido, permite la navegación
    //     return true;
    //   }
    // }

    // // Si no hay un token válido, redirige al componente de inicio de sesión
    // this.router.navigate(['/login']);
    return true;
};
