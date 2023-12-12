import jsonData from "./assets/data.json";
export class DatasetController {
    datasetDef: string = `The Dataset Component in the <code>ng-declarative</code> framework is a versatile component designed for streamlined data management. With the ability to load data from various sources, support dynamic schemas, and provide reactive updates, it enhances the efficiency and flexibility of dataset handling in the applications. Leveraging RxJS observables, built-in error handling, and seamless integration within the angular, the Dataset Component facilitates robust data-driven functionalities, making it an essential tool for sophisticated declarative app development.`;


    daysJSONList = [
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thrusday", "Friday", "Satarday"
    ]
    commonFunctions: `
     getRandomColor(input: string): string {
            // Simple hash function
            let hash = 0;
            for (let i = 0; i < input.length; i++) {
                hash = input.charCodeAt(i) + ((hash << 5) - hash);
            }
            // Convert the hash to a 24-bit color
            const color = '#' + ('00000' + (hash & 0xFFFFFF).toString(16)).slice(-6);
            return color;
        }

    `;
    example1source = `In Route Controoler:
        daysJSONList = [
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thrusday", "Friday", "Satarday"
            ]
       
         In Source XML:
         <dataset name="days" type="json" src="%%routeCtrl.daysJSONList%%" id="si3UEoV"></dataset>
          <loop items="app.datasets.days.dataset$" id="lKNxtIt">
          <label margin="small" padding="small" background-color="%%routeCtrl.getRandomColor(item)%%" text="%%item%%" id="m11LBLQ"></label>
        </loop>`;
    example2SubHeadingPara = `To incorporate a JSON file from the assets, simply position the file within the <code>src/assets</code> directory. Subsequently, employ the type attribute as json-file within the dataset component. When specifying the source (src) attribute in the component, provide the file name as a string parameter, like this: src="'assets/data.json'".`;
    example2source1 = `....
    <dataset name="jsonfromfile" type="json-file" src="&apos;assets/data.json&apos;" id="si3UdEsoVs"></dataset>

  <loop items="app.datasets.jsonfromfile.dataset$" id="Lbvz2bw">
              <label margin="small" padding="small" background-color="%%routeCtrl.getRandomColor(item.name)%%" text="%%item.name%%" id="fSnpQku"></label>
            </loop>
    ...
    `;
    example2source2 = `
    In router controller:
            import jsonData from "./assets/data.json";

            sample: any[];
    constructor(private app: any) {
        this.sample = jsonData as any[];
    }
    In source.xml :
    ....
    <dataset name="jsonfilefromcontroller" type="json" src="%%routeCtrl.sample%%" id="si3UdEsoVs"></dataset>

  <loop items="app.datasets.jsonfilefromcontroller.dataset$" id="Lbvz2bw">
              <label margin="small" padding="small" background-color="%%routeCtrl.getRandomColor(item.name)%%" text="%%item.name%%" id="fSnpQku"></label>
            </loop>
    ...
    `;
    example2SubHeading2Para = `To include a JSON file, place it within the <code>src/</code> directory. Afterwards, in the controller, load the JSON as an array, and pass this array to the dataset.`;
    sample: any[];
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
    testUrl = "https://api.nytimes.com/svc/topstories/v2/home.json?api-key=zFN5CcUscU5jFK98fkzgcYXuFdhSV8GV";
    constructor(private app: any) {
        this.sample = jsonData as any[];
    }

    getRandomColor(input: string): string {
        // Simple hash function
        let hash = 0;
        for (let i = 0; i < input.length; i++) {
            hash = input.charCodeAt(i) + ((hash << 5) - hash);
        }

        // Convert the hash to a 24-bit color
        const color = '#' + ('00000' + (hash & 0xFFFFFF).toString(16)).slice(-6);

        return color;
    }

}