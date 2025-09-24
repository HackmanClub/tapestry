# Tapestry Theme

Tapestry is a Hexo theme designed for tumblr style gallery blog feed.

I am using this theme for a personal blog, or you can check the official theme preview.

---

## 1. Installation

1. Clone the theme into your Hexo project:

```bash
cd your-hexo-project
git clone https://github.com/HackmanClub/tapestry.git themes/tapestry
```

1. Set the theme in Hexo’s main \_config.yml:

```yaml
theme: tapestry
```

1. Install dependencies:

```bash
npm install sharp
```

---

## 2. Configuration

The theme uses its own \_config.yml inside themes/tapestry/. You will need to copy / rename \_EXAMPLE_config.yml as a starting point:

```bash
cp themes/tapestry/_EXAMPLE_config.yml themes/tapestry/_config.yml
```

### Important Sections

#### Site Settings

- avatar, banner, favicon: paths to your images.
- primary_color: main color for your theme.
- tag_border: add borders around tags.
- sidebar: show or hide the sidebar.
- scarves: enable or disable scarves links.

#### Scarves

Scarf links appear at the top right. You can use an image or FontAwesome icon:

```yaml
scarf:
  - url: tags/baking
    image: images/assets/scarves/scarf.png
    icon: false
    enable: true
    alt: Example
  - url: tags/photo
    image: false
    icon: fa-solid fa-heart
    enable: true
    alt: Example
```

- url – link target
- image – path to scarf image
- icon – FontAwesome icon class
- enable – show/hide scarf
- alt – accessibility text

#### Social Links

Add or remove social links easily:

```yaml
social:
  - url: https://www.instagram.com/
    icon: fab fa-instagram
    enable: true
```

---

### Sidebar Menu

Configure links in the sidebar:

```yaml
sidebar_menu:
  - enable: true
    name: Home
    url: /
  - enable: true
    name: Get Hexo
    url: https://hexo.io/docs/setup
```

- enable – show/hide
- name – link text
- url – destination

---

## 3. Using Thumbnails

- Put post images in source/images/
- The theme generates thumbnails automatically in source/thumbnails/
- Use small- or large- in templates depending on your layout.

Example in a template:

```ejs
<% if (post.photos && post.photos.length) { %>
  <img class="gallery" src="<%- config.root %>thumbnails/small-<%- post.photos[0].replace(/^images\//,'') %>" alt="<%- post.title %>">
<% } %>
```

> ⚠️ Only shows image if post.photos exists.

---

## 4. Running Locally

Start a local Hexo server to preview:

```bash
hexo clean
hexo s
```

- Visit http://localhost:4000
- Changes in templates or CSS are reflected immediately.
