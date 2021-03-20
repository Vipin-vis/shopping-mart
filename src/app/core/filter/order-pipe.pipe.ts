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
      return it.box_id.toLowerCase().includes(boxID);
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
      return it.order_id.toLowerCase().includes(orderID);
    });
  }

}

@Pipe({
  name: 'orderPipePayment'
})
export class OrderPipePayment implements PipeTransform {

  transform(value: any[], payment: string): any {

    if (payment == "" || payment =="ALL") {
      return value
    }

    payment = payment.toLowerCase();

    return value.filter( (it: any) => {
      return it.payment_status.toLowerCase().includes(payment);
    });
  }

}

@Pipe({
  name: 'orderPipeStatus'
})
export class OrderPipeStatus implements PipeTransform {

  transform(value: any[], status: string): any {

    if (status == ""|| status =="ALL") {
      return value
    }

    status = status.toLowerCase();

    return value.filter( (it: any) => {
      return it.order_status.toLowerCase().includes(status);
    });
  }

}
