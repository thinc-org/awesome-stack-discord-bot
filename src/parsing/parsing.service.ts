import { Injectable } from '@nestjs/common';
import { JSDOM } from 'jsdom';

@Injectable()
export class ParsingService {
  public extractPlainText(element: any): string {
    let text = '';

    if (element.nodeType === element.TEXT_NODE) {
      text += element.textContent;
    } else if (element.nodeType === element.ELEMENT_NODE) {
      if (element.tagName === 'SCRIPT' || element.tagName === 'STYLE') {
        // Skip content inside script tags
        return text;
      }
      for (let child of element.childNodes) {
        text += this.extractPlainText(child);
      }
    }

    return text.trim();
  }

  public getAllPlainText(htmlString: string): string {
    const dom = new JSDOM(htmlString);
    const tempDiv = dom.window.document.createElement('div');
    tempDiv.innerHTML = htmlString;

    return this.extractPlainText(tempDiv);
  }
}
