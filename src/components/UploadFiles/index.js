import React from 'react';
import { List, ListItem } from 'material-ui/List';
import AlertErrorOutline from 'material-ui/svg-icons/alert/error-outline';
import Avatar from 'material-ui/Avatar';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
/*eslint-disable */
import Config from 'Config';
/*eslint-enable */

import { blue500 } from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import ContentArchive from 'material-ui/svg-icons/content/archive';
import CircularProgress from 'material-ui/CircularProgress';

const style = {
  top: '18px',
  right: '15px',
  color: '#29B6F6'
};
const UploadFiles = ({ validFiles, invalidFiles }) => (
  <div>
    <List> 
      {
        validFiles.map((file, index) => (
          <ListItem 
            key={index}
            leftAvatar={<Avatar icon={<ActionAssignment />} backgroundColor={blue500} />}
            primaryText={file.name}
            secondaryText={`${parseFloat(file.size/1024).toFixed(2)} kB`}
            rightIconButton={file.isProcessed ? 
              <RaisedButton 
                label="Result" 
                secondary={true} style={style} 
                href={`${Config.backend}/result/${file._id}`}
                icon={<ContentArchive />}
              /> : 
              <CircularProgress style={style} />
            }
          />
        ))
      }
    </List>
    <List> 
      {
        invalidFiles.map((file, index) => (
          <ListItem 
            key={index}
            primaryText={file.name}
            secondaryText={file.size}
            leftIcon={<AlertErrorOutline />} 
          />
        ))
      }
    </List>
  </div>
);

export default UploadFiles;