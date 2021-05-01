import { assignColorCode } from './assignColorCode';

/**
 * テストは、max=240、min=80、range=16を固定値として行う
 */
const assignColorCodeByValue = assignColorCode(240)(80)(16);

describe(assignColorCode.name, () => {
  // 入力値が0の場合、中間値は最小値と同じ値となる。
  it('入力値が0の場合、rがf0、gが50、bが50の色コードとなる', () => {
    const code = assignColorCodeByValue(0);
    expect(code).toBe('#50f050');
  });

  /**
   * 入力値が1~3の場合。
   *
   * - 最高値:240 = f0
   * - 中間値:110 = 6e
   * - 最小値: 80 = 50
   */
  it('入力値が1の場合、rがf0、gが6e、bが50の色コードとなる', () => {
    const code = assignColorCodeByValue(1);
    expect(code).toBe('#f06e50');
  });

  it('入力値が2の場合、rが6e、gが50、bがf0の色コードとなる', () => {
    const code = assignColorCodeByValue(2);
    expect(code).toBe('#6e50f0');
  });

  it('入力値が3の場合、rが50、gがf0、bが6eの色コードとなる', () => {
    const code = assignColorCodeByValue(3);
    expect(code).toBe('#50f06e');
  });

  /**
   * 入力値が4~6の場合。
   *
   * - 最高値:240 = f0
   * - 中間値:140 = 8c
   * - 最小値: 80 = 50
   */
  it('入力値が4の場合、rがf0、gが8c、bが50の色コードとなる', () => {
    const code = assignColorCodeByValue(4);
    expect(code).toBe('#f08c50');
  });

  it('入力値が5の場合、rが8c、gが50、bがf0の色コードとなる', () => {
    const code = assignColorCodeByValue(5);
    expect(code).toBe('#8c50f0');
  });

  it('入力値が6の場合、rが50、gがf0、bが8cの色コードとなる', () => {
    const code = assignColorCodeByValue(6);
    expect(code).toBe('#50f08c');
  });

  /**
   * 入力値が13~15の場合。
   *
   * - 最高値:240 = f0
   * - 中間値:230 = e6
   * - 最小値: 80 = 50
   */
  it('入力値が13の場合、rがf0、gがe6、bが50の色コードとなる', () => {
    const code = assignColorCodeByValue(13);
    expect(code).toBe('#f0e650');
  });

  it('入力値が14の場合、rがe6、gが50、bがf0の色コードとなる', () => {
    const code = assignColorCodeByValue(14);
    expect(code).toBe('#e650f0');
  });

  it('入力値が15の場合、rが50、gがf0、bがe6の色コードとなる', () => {
    const code = assignColorCodeByValue(15);
    expect(code).toBe('#50f0e6');
  });

  // valueとrangeの値が同じ場合、中間値の値は入力値が0の場合と同じとなる。
  it('入力値が16の場合、入力値が0の場合の色コードと同じとなる。', () => {
    const codeA = assignColorCodeByValue(0);
    const codeB = assignColorCodeByValue(16);
    expect(codeA).toEqual(codeB);
  });

  // 入力値が17~19の場合、入力値が1~3の場合と同じとなる。
  it('入力値が17の場合、入力値が1の場合の色コードと同じとなる。', () => {
    const codeA = assignColorCodeByValue(1);
    const codeB = assignColorCodeByValue(17);
    expect(codeA).toEqual(codeB);
  });

  it('入力値が18の場合、入力値が2の場合の色コードと同じとなる。', () => {
    const codeA = assignColorCodeByValue(2);
    const codeB = assignColorCodeByValue(18);
    expect(codeA).toEqual(codeB);
  });

  it('入力値が19の場合、入力値が3の場合の色コードと同じとなる。', () => {
    const codeA = assignColorCodeByValue(3);
    const codeB = assignColorCodeByValue(19);
    expect(codeA).toEqual(codeB);
  });
});
