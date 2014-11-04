/** @jsx React.DOM */

var pathname = window.location.pathname;
var linksUrl = '/api/v1' + pathname + '/links';

function buildLink(url) {
  return {
    id: -1,
    url: url,
    time_ago: 'less than a minute'
  };
}

var Input = React.createClass({
  handleSubmit: function(e) {
    var node, url, link;
    node = this.refs.url.getDOMNode();
    url = node.value.trim();
    link = buildLink(url);
    e.preventDefault();
    node.value = '';
    this.props.onLinkSubmit(link);
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

  concat: function() {
    var maxLinkLength = 80;
    return this.props.url.length > maxLinkLength ? this.props.url.substring(0, maxLinkLength) + "..." : this.props.url;
  },

  render: function () {
    return (
      <li className="link">
        <a href={this.props.url}>{this.concat()}</a>
        &mdash; <span className="time-ago">{this.props.time_ago}</span>
      </li>
    );
  }
});

var LinkList = React.createClass({
  render: function () {
    var links = this.props.links.map(function (link) {
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
  getInitialState: function () {
    return {
      links: []
    };
  },

  componentDidMount: function () {
    $.get(linksUrl, function (data) {
      if (this.isMounted) {
        this.setState({
          links: data
        });
      }
    }.bind(this), 'json')
  },

  handleLinkSubmit: function (link) {
    var links = this.state.links;

    this.setState({
      links: [link].concat(links)
    });
    $.post(linksUrl, {link: link}, function (data) {
      this.setState({
        links: [data].concat(links)
      });
    }.bind(this), 'json');
  },

  render: function () {
    return (
      <div id="links">
        <Input onLinkSubmit={this.handleLinkSubmit} />
        <LinkList links={this.state.links} />
      </div>
    );
  }
});

$(document).ready(function () {
  var linksElem = document.getElementById('links')
  if (linksElem) {
    React.renderComponent(<App />, linksElem);
  }
});

