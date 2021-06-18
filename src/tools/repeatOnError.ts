import chalk from 'chalk';


export async function repeatOnError<T>(block: () => Promise<T>, repetitions: number = 10): Promise<T> {
    let counter = 0;
    let error = undefined;
    while (counter < repetitions) {
        try {
            return await block();
        } catch (e) {
            console.warn(chalk.yellow`<76fe23e4> Catch error ${chalk.italic`${e}`}. Try to repeat `);
            counter++;
            error = e;
        }
    }
    throw Error(`<de30891c> Reach end of repetitions number (${repetitions}) with error ${error}`);
}
