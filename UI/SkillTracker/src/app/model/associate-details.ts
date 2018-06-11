import { Skill } from '../model/skill'
export class AssociateDetails {

    constructor() {

    }
    public associateId: number;
    public name: string;
    public email: string;
    public mobile: string;
    public pic: string;
    public gender: string;
    public statusGreen: boolean;
    public statusBlue: boolean;
    public statusRed: boolean;
    public level1: boolean;
    public level2: boolean;
    public level3: boolean;
    public remark: string;
    public strength: string;
    public weakness: string;
    public skills: Skill[];
    public spokenLevel : number=0;
	public communicactionLevel: number=0;
	public logicLevel: number=0;
	public aptitudeLevel: number=0;
	public confidenceLevel: number=0;





}
