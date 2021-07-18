import { Injectable } from '@nestjs/common';

@Injectable()
export class RoudRobinService {

    constructor() { }

    roundRobin(array: Array<string>, index?: number): any {
        index = index || 0;
        if (array === undefined || array === null)
            array = [];
        else if (!Array.isArray(array))
            throw new Error('Expecting argument to RoundRound to be an Array');

        return function () {
            if (index >= array.length) index = 0;
            return array[index++];
        };
    }

}


