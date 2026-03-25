import { HttpInterceptorFn } from '@angular/common/http';

export const AuthTokenInterceptor: HttpInterceptorFn = (req, next) => {
  //1 - Récupeartion du token dans le localStorage
  const token = localStorage.getItem('token');

  console.log(' T  O K E N ', token);

  //2 - Récuperation du req et le mettre directement dans le reqToSend
  let requestToSend = req;

  //3 - verification si token existe
  if (token) {
    const headers = req.headers.set('Authorization', `Bearer ${token}`);

    //4 - mise à jour et clonage
    requestToSend = req.clone({
      headers,
    });
  }

  //5 - envoie avant tout les requets

  return next(requestToSend);
};
