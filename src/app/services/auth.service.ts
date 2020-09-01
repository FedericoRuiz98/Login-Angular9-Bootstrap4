import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { auth } from 'firebase/app';
import { async } from '@angular/core/testing';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user: User;

  constructor(public afaouth: AngularFireAuth) { }

  async login(email:string, password:string) {
    try {
      const result = await this.afaouth.signInWithEmailAndPassword(email, password);
      return result;
    } catch (error) {
      console.log(error);
    }    
  }

  async register(email: string, password:string) {
    try {
      const result = await this.afaouth.createUserWithEmailAndPassword(email, password);
      return result;
    } catch (error) {
      console.log(error);      
    }    
  }

  async logout() {
    try {
      await this.afaouth.signOut();
    } catch (error) {
      console.log(error);      
    }    
  }

  getCurrentUser() {
   return this.afaouth.authState.pipe(first()).toPromise();
  }
}
