import { CssClass, CssProperty, CssVariableImpl, CssVariableSpecification, css } from '../css-render/modules'

test("Test css render", () => {
    const simpleClass = new CssClass("testClass", [
        new CssProperty("color", "#000000"),
        new CssProperty("font-size", "15px")
    ]);

    const simpleRender = simpleClass.render()
    expect(simpleRender).toBe(
        `.testClass {
    color: #000000;
    font-size: 15px;
}`
    )

    const complexClass = new CssClass("testClass", [
        new CssVariableSpecification("my-color-var", "#000000"),
        new CssProperty("color", new CssVariableImpl("my-color-var")),
        new CssProperty("color", new CssVariableImpl("my-color-var", "#000000")),
        new CssProperty("font-size", "15px")
    ]);
    const complexRender = complexClass.render()
    expect(complexRender).toBe(
        `.testClass {
    --my-color-var: #000000;
    color: var(--my-color-var);
    color: var(--my-color-var, #000000);
    font-size: 15px;
}`)

    const complexClassFunctional = css.useBlock(
        "test",
        css.useClass("testClass", [
            css.declareVar("my-color-var", "#000000"),
            css.property("color", css.useVar("my-color-var")),
            css.property("color", css.useVar("my-color-var", "#000000")),
            css.property("font-size", "15px")
        ])
    );
    const complexFunctionalRender = complexClassFunctional.render()
    expect(complexFunctionalRender).toBe(
`test {
    .testClass {
        --my-color-var: #000000;
        color: var(--my-color-var);
        color: var(--my-color-var, #000000);
        font-size: 15px;
    }
}`)
})