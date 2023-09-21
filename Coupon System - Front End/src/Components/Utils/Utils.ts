
export const arraySum = (numArray: Array<number>) => {
    let tempSum = 0;
    for (let i = 0; i < numArray.length; i++) {
        tempSum += numArray[i];
    }
    return tempSum;
}

export const showCouponsCount = ((num: number) => {
    if (num > 0) {
        return num;
    }
    return "No Coupons";
})

