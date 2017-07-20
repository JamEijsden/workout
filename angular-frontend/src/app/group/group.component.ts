import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GroupService} from "../services/group.service";

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit, OnDestroy {
  id: string;
  title: string;
  exersices: any;
  private sub: any;
  constructor(private route: ActivatedRoute, private groupService: GroupService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a number
      this.groupService.getGroupById(this.id)
        .subscribe(
          data => {
            console.log();
            this.title = data.name;
          }, error => {
            console.log();
          }
        )
      // In a real app: dispatch action to load the details here.
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
