import React from 'react';
import ExtensionBridge from '../lib/ExtensionBridge';
import GroupComponent from './GroupComponent';

export default class GroupList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      groups: ExtensionBridge.get().getGroups()
    };

    ExtensionBridge.get().setDataChangeHandler((tasks) => {
      // We need ExtensionBridge.get().isMobile() to be defined, and this handler is called once on bridge ready.
      this.initiateSorting();
      this.reloadGroups();
    })

    ExtensionBridge.get().setOnReady(() => {
      let platform = ExtensionBridge.get().getPlatform();
      // add platform class to main <html> element
      var root = document.documentElement;
      root.className += platform;
      // this.setState({ready: true})
    })
  }

  reloadGroups() {
    this.setState({groups: ExtensionBridge.get().getGroups()});
  }

  componentDidMount() {
    ExtensionBridge.get().initiateBridge();
    this.reloadGroups();
  }

  onGroupDataChange = (group) => {
    ExtensionBridge.get().save();
  }

  render() {
    return (
      <div>
        {this.state.groups.map((group) =>
          <GroupComponent
            onChange={() => this.onGroupDataChange(group)}
            key={group.getKey()}
            group={group}
          />
        )}
      </div>
    )
  }

}