import { CommonModule } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, ControlContainer, ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
/**
 * Componente de input para formularios, con soporte para máscaras, validaciones y estilos personalizados.
 * Permite la integración con formularios reactivos de Angular.
 *
 * @example
 * <apz-form-input formControlName="name" label="Nombre" placeholder="Ingrese su nombre"></apz-form-input>
 */
@Component({
    standalone: true,
    selector: 'apz-form-select',
    templateUrl: './form-select.component.html',
    imports: [CommonModule, ReactiveFormsModule],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => FormSelectComponent),
        },
    ]
})
export class FormSelectComponent implements ControlValueAccessor, OnInit {
    /** Nombre que aparece arriba de input con etiqueta ´label´ */
    @Input() label: string;
    /** Placeholder de input */
    @Input() placeholder: string | number;
    /** Mensaje de error que aparecerá cuando el validador dé error */
    @Input() errMsg: string;
    /** FormControl del formulario */
    @Input() formControlName: string;
    /** ID de input para alguna acción extra como para identificador del autocompletado */
    @Input() id: string;
    /** Opciones cuando input es un select */
    @Input() options: { value: string | number; label: string }[];
    /** Evento de salida en algún cambio al input a componente padre */
    @Output() changed = new EventEmitter<any>();

    /** Atributos extra para input */
    attr: any;
    /** FormControl propiedad del formulario */
    control: AbstractControl<any, any> | any;

    constructor(private controlContainer: ControlContainer) { }

    ngOnInit() {
        this.id = this.id || this.formControlName || 'select-' + Math.random().toString(36).substring(2, 15);

        if (this.controlContainer && this.formControlName) {
            this.control = (this.controlContainer.control as AbstractControl<any, any>).get(this.formControlName);
        }
    }

    /** Función que se ajecuta al cambiar el estado del input */
    changeModel(value: any) {
        this.changed.next(value);
    }

    registerOnChange() { }

    registerOnTouched() { }

    writeValue() { }

    setDisabledState() { }
}
