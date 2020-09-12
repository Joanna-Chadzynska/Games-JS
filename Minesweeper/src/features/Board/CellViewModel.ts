import { ICell } from './Board';

export class CellViewModel {
	public x: number;
	public y: number;
	public isFlagged: boolean;
	public isMine: boolean;
	public isRevealed: boolean;
	public neighbour: number;
	public class: string;

	constructor(data: ICell) {
		this.x = data.x;
		this.y = data.y;
		this.isFlagged = data.isFlagged;
		this.isMine = data.isMine;
		this.isRevealed = data.isRevealed;
		this.neighbour = data.neighbour;
		this.class = 'border--concave';
	}

	revealCell() {
		this.isRevealed = true;
		this.class = 'border--revealed';
	}
}
