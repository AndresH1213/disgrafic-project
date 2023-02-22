import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-calculador-intro',
  templateUrl: './modal-calculador-intro.component.html',
  styleUrls: ['./modal-calculador-intro.component.css'],
})
export class ModalCalculadorIntroComponent implements OnInit {
  @Input() showModal: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
