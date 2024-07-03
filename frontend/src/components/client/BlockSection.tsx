import React from 'react';
import CardTestional from './cards/CardTestional';

const BlockSection = () => {
  return (
    <div>
      <div className="bg-white font-primary p-20 mb-10">
        <div className="max-w-6xl max-md:max-w-lg mx-auto">
          <div className="mb-5 pb-4">
            <h2 className="text-3xl font-extrabold text-[#333] text-center mb-8">
              LATEST BLOGS
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
            <CardTestional
              img="https://readymadeui.com/hacks-watch.webp"
              title="Hacks to Supercharge Your Day"
              author="MARK ADAIR"
              time="7 JUN 2023"
              summary=""
              link="asdbjsdvjb"
              content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
                  accumsan, nunc et tempus blandit."
            />
            <CardTestional
              img="https://readymadeui.com/prediction.webp"
              title="Trends and Predictions"
              author="SIMON KONECKI"
              time="7 JUN 2023"
              summary=""
              link="asdbjsdvjb"
              content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
                  accumsan, nunc et tempus blandit."
            />
            <CardTestional
              img="https://readymadeui.com/team-image.webp"
              title="Innovators Changing the Game"
              author="MARK ADAIR"
              time="7 JUN 2023"
              summary=""
              link="asdbjsdvjb"
              content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
                  accumsan, nunc et tempus blandit."
            />
            <CardTestional
              img="https://readymadeui.com/team-image.webp"
              title="Innovators Changing the Game"
              author="MARK ADAIR"
              time="7 JUN 2023"
              summary=""
              link="asdbjsdvjb"
              content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
                  accumsan, nunc et tempus blandit."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockSection;
