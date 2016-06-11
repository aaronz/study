import $ from 'jquery';
import DataSource from './datasource';

export default class FlexTable {
    constructor() {
        this.ds = new DataSource();
    }
    
    add(a, b) {
        this.ds.getData();
    }
}