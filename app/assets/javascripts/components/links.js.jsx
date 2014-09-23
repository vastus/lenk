/** @jsx React.DOM */

var Input = React.createClass({
  handleSubmit: function() {
    var node = this.refs.url.getDOMNode();
    var url = node.value.trim();
    node.value = '';
 
    // create new bb link model and save it

    return false;
  },

  render: function () {
    return (
      <div className="new">
        <form onSubmit={this.handleSubmit}>
          <div className="field">
            <input ref="url" type="text" placeholder="Paste your link here and hit Enter" />
          </div>
        </form>
      </div>
    );
  }
});

var LinkItem = React.createClass({
  render: function () {
    return (
      <li className="link">
        <a href={this.props.url}>{this.props.url}</a>
        &mdash;
        <span className="time-ago">{this.props.time_ago}</span>
      </li>
    );
  }
});

var LinkList = React.createClass({
  getInitialState: function () {
    return {
      links: []
    };
  },

  componentDidMount: function () {
    var links = new Links();
    var selfie = this;
    links.fetch({
      success: function (data) {
        selfie.setState({
          links: data.toJSON()
        });
      }
    });
  },

  render: function () {
    var links = this.state.links.map(function (link) {
      return <LinkItem key={link.id} url={link.url} time_ago={link.time_ago} />
    });

    return (
      <ol id="link-list">
        {links}
      </ol>
    );
  }
});

var App = React.createClass({
  render: function () {
    return (
      <div id="links">
        <Input />
        <LinkList />
      </div>
    );
  }
});

$(document).ready(function () {
  React.renderComponent(<App />, document.body);
});


