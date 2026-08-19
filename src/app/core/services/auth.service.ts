import { Injectable } from '@angular/core';
import { Observable, from, map } from 'rxjs';

import { supabase } from './supabase.client';

@Injectable({ providedIn: 'root' })
export class AuthService {

  signIn(
    email: string,
    password: string
  ): Observable<{ error: string | null }> {

    return from(
      supabase.auth.signInWithPassword({
        email,
        password
      })
    ).pipe(
      map(({ error }) => ({
        error: error ? error.message : null
      }))
    );
  }

  signOut(): Observable<void> {
    return from(
      supabase.auth.signOut()
    ).pipe(
      map(() => undefined)
    );
  }

  isAuthenticated(): Observable<boolean> {
    return from(
      supabase.auth.getUser()
    ).pipe(
      map(({ data, error }) => {
        return !!data.user && !error;
      })
    );
  }
}