
import * as $ from 'jquery';
import * as _ from 'lodash';

interface options {

}

export class FlexTable {
    options: options;

    constructor(dom: string) {

    }

    setOptions(opts: options) {
        _.extend(this.options, opts);
        console.log('hello flextable');
    }
}