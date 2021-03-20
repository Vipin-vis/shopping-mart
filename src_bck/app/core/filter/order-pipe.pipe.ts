import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderPipe'
})
export class OrderPipe implements PipeTransform {

  transform(value: any[], boxID: string): any {

    if (boxID == "") {
      return value
    }

    boxID = boxID.toLowerCase();

    return value.filter( (it: any) => {
      return it.boxID.toLowerCase().includes(boxID);
    });
  }

}

@Pipe({
  name: 'orderPipeOrder'
})
export class OrderPipeOrder implements PipeTransform {

  transform(value: any[], orderID: string): any {

    if (orderID == "") {
      return value
    }

    orderID = orderID.toLowerCase();

    return value.filter( (it: any) => {
      return it.orderID.toLowerCase().includes(orderID);
    });
  }

}

@Pipe({
  name: 'orderPipePayment'
})
export class OrderPipePayment implements PipeTransform {

  transform(value: any[], payment: string): any {

    if (payment == "") {
      return value
    }

    payment = payment.toLowerCase();

    return value.filter( (it: any) => {
      return it.payment.toLowerCase().includes(payment);
    });
  }

}

@Pipe({
  name: 'orderPipeStatus'
})
export class OrderPipeStatus implements PipeTransform {

  transform(value: any[], status: string): any {

    if (status == "") {
      return value
    }

    status = status.toLowerCase();

    return value.filter( (it: any) => {
      return it.status.toLowerCase().includes(status);
    });
  }

}
