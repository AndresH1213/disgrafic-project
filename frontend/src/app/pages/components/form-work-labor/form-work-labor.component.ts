import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CalcService } from '../../../services/calc.service';

interface Field {
  name: string;
  price: number;
}

interface Percentage {
  name: string;
  value: string;
}

@Component({
  selector: 'app-form-work-labor',
  templateUrl: './form-work-labor.component.html',
  styleUrls: ['./form-work-labor.component.css'],
})
export class FormWorkLaborComponent implements OnInit {
  @Output() valueHandWork: EventEmitter<number> = new EventEmitter();
  @Output() percentage: EventEmitter<string> = new EventEmitter();

  public percentages: Percentage[] = [];
  private labelFields: string[] = [];
  formFields: Field[] = [];

  constructor(private calcService: CalcService) {
    this.loadLabelField();
    this.formFields = this.loadFormFields();
  }

  ngOnInit(): void {
    this.loadPercentanges();
  }

  loadPercentanges() {
    this.percentages = this.calcService.getPercentages();
  }

  loadLabelField() {
    this.labelFields = this.calcService.getLabelFieldsHandWork();
  }

  loadFormFields() {
    return new Array(this.labelFields.length)
      .fill(undefined)
      .map((_, i) => ({ name: this.labelFields[i], price: 0 }));
  }

  setPercentage(event: any) {
    this.percentage.emit(event.value);
  }

  workLaborCalculate(_: any) {
    let total = 0;
    this.formFields.forEach((field) => {
      total += field.price;
    });
    this.valueHandWork.emit(total);
  }
}
