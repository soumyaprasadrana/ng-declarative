export class ExampleController {
    example3source = `.....
    <dataset name="nyttopsciencestories" data-key="results" type="url" src="&apos;https://api.nytimes.com/svc/topstories/v2/science.json?api-key=zFN5CcUscU5jFK98fkzgcYXuFdhSV8GV&apos;" id="it9RAzz"></dataset>

     <column border="minimal" border-color="var(--bs-warning)" height="define-380px" overflow="scroll" id="kbz8tUT">
            <block padding="large" direction="column" id="EXJZIE8">
              <row background-color="#000" justify-contents="center" id="P7BIo8V">
                <column id="WMmbIkT">
                  <label text-color="var(--bs-warning)" theme="wrap,bold,heading-large" text="New York Times Top Science Stories" id="abO70Js"></label>
                </column>
              </row>
              <row padding="small" id="abDY3Tp">
                <loop items="app.datasets.nyttopsciencestories.dataset$" id="zst5YJP">
                  <label display-condition="$index!=0 and $index%2==0 and item.title!=&apos;&apos;" theme="wrap,bold,heading-smallest" text="Title: %%item.title%%" id="hzpZL8S"></label>
                  <loop display-condition="$index!=0 and $index%2==0 and item.title!=&apos;&apos;" outer-loop-item="item" outer-loop-index="$index" inner-loop="true" inner-loop-items="item.multimedia" id="AURlGo1">
                    <image display-condition="$index==0" type="image" src="%%item.url%%" id="Jb0gYS7"></image>
                  </loop>
                </loop>
              </row>
            </block>
    </column>
    .......`;
    constructor(private app: any) { }
}