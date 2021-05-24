import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public id: string;
  public rol: string;
  constructor(private route: ActivatedRoute, private router: Router) {
    this.rol = localStorage.getItem('rol');
   }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

  }
}
